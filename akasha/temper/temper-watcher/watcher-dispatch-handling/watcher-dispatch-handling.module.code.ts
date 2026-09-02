import { existsSync } from "node:fs"
import type { WatcherConfig } from "../watcher-config/watcher-config.module.code.ts"
import type { FileType } from "../watcher-file-type/watcher-file-type.module.code.ts"
import { log, logError } from "../watcher-logging/watcher-logging.module.code.ts"
import { writeFileAtomicWithRetry } from "../watcher-retry/watcher-retry.module.code.ts"
import {
  preDispatchOperations,
  TARGET_OPERATIONS,
} from "../watcher-run-observing/watcher-run-observing.module.code.ts"
import {
  describeOperations,
  type SyncOperation,
} from "../watcher-run-outcome/watcher-run-outcome.module.code.ts"
import {
  hashContent,
  shouldSkipSelfWrite,
} from "../watcher-self-write-guard/watcher-self-write-guard.module.code.ts"
import {
  looksStructurallyComplete,
  matchesSnapshot,
  readFileWhenStable,
  type StableRead,
  type StatSnapshot,
} from "../watcher-stable-read/watcher-stable-read.module.code.ts"
import type { FileState } from "../watcher-state/watcher-state.module.code.ts"

export const DEBOUNCE_MS = 3000

export const ALREADY_RUNNING = "import already in progress, skipping"

export const FILE_NOT_FOUND = "file not found"

export const NEVER_STABILIZED = "file never stabilized"

export const LOOKS_TRUNCATED = "content looks truncated (no closing brace)"

export const CHANGED_SINCE_STABLE_READ = "file changed since the stable read"

type OperationTargets = typeof TARGET_OPERATIONS

export type SideFileName = Extract<
  OperationTargets[FileType],
  { readonly sideFile: string }
>["sideFile"]

type ConfigPathKey = `${SideFileName}Path`

type AnswerHashKey = `${SideFileName}SideFileHash`

type RememberedHashKey = `last${Capitalize<SideFileName>}WriteBackHash`

export type SideFileConfig = Pick<WatcherConfig, ConfigPathKey>

interface SideFileKeys {
  readonly configPath: ConfigPathKey
  readonly answerHash: AnswerHashKey
  readonly remembered: RememberedHashKey
}

const SIDE_FILE_KEYS = {
  charactersConfig: {
    configPath: "charactersConfigPath",
    answerHash: "charactersConfigSideFileHash",
    remembered: "lastCharactersConfigWriteBackHash",
  },
  companionsConfig: {
    configPath: "companionsConfigPath",
    answerHash: "companionsConfigSideFileHash",
    remembered: "lastCompanionsConfigWriteBackHash",
  },
  inventoryConfig: {
    configPath: "inventoryConfigPath",
    answerHash: "inventoryConfigSideFileHash",
    remembered: "lastInventoryConfigWriteBackHash",
  },
} as const satisfies Record<SideFileName, SideFileKeys>

export function sideFileKeysFor(fileType: FileType): SideFileKeys | undefined {
  const target = TARGET_OPERATIONS[fileType]
  if (!("sideFile" in target)) return undefined
  return SIDE_FILE_KEYS[target.sideFile]
}

type ConfigPathAsk = Partial<Record<ConfigPathKey, string>>

function configPathAsk(
  sideFile: SideFileKeys | undefined,
  configPaths: SideFileConfig
): ConfigPathAsk {
  if (sideFile === undefined) return {}
  const ask: ConfigPathAsk = {}
  ask[sideFile.configPath] = configPaths[sideFile.configPath]
  return ask
}

export type DispatchAsk = {
  readonly fileType: FileType
  readonly content: string
  readonly token: string
  readonly serverUrl: string
  readonly sourcePath: string
  readonly sourceMtimeMs: number
} & Readonly<ConfigPathAsk>

export type DispatchAnswer = {
  readonly ok: boolean
  readonly operations: readonly SyncOperation[]
  readonly writeBack: string | null
  readonly error?: string
} & Readonly<Record<AnswerHashKey, string | null>>

export interface DispatchHandlerSeams {
  readonly now?: () => number
  readonly filePresent?: (path: string) => boolean
  readonly readWhenStable?: (path: string) => Promise<StableRead | null>
  readonly fileUnchanged?: (path: string, snapshot: StatSnapshot) => boolean
  readonly writeBackTo?: (path: string, content: string) => undefined
  readonly note?: (message: string) => undefined
  readonly noteFailure?: (message: string) => undefined
}

export interface DispatchHandlerArgs {
  readonly name: string
  readonly fileType: FileType
  readonly sourcePathOf: () => string
  readonly fileState: FileState
  readonly serverUrl: string
  readonly token: string
  readonly configPaths: SideFileConfig
  readonly enqueue: (run: () => Promise<void>) => undefined
  readonly checkForUpdate: () => Promise<void>
  readonly dispatch: (ask: DispatchAsk) => Promise<DispatchAnswer>
  readonly report: (operations: readonly SyncOperation[]) => Promise<void>
  readonly seams?: DispatchHandlerSeams
}

function messageOf(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

export function makeDispatchHandler(args: DispatchHandlerArgs): () => void {
  const seams = args.seams ?? {}
  const now = seams.now ?? Date.now
  const filePresent = seams.filePresent ?? existsSync
  const readWhenStable = seams.readWhenStable ?? readFileWhenStable
  const fileUnchanged = seams.fileUnchanged ?? matchesSnapshot
  const writeBackTo = seams.writeBackTo ?? writeFileAtomicWithRetry
  const note = seams.note ?? log
  const noteFailure = seams.noteFailure ?? logError

  const { name, fileType, fileState, configPaths } = args
  const sideFile = sideFileKeysFor(fileType)
  const configPath = sideFile === undefined ? undefined : configPaths[sideFile.configPath]

  const run = async (): Promise<void> => {
    try {
      await args.checkForUpdate()

      const filePath = args.sourcePathOf()
      const stable = await readWhenStable(filePath)
      if (stable === null) {
        const absent = !filePresent(filePath)
        const why = absent ? FILE_NOT_FOUND : NEVER_STABILIZED
        note(`${name} skipped — ${why}: ${filePath}`)
        await args.report(
          preDispatchOperations({
            fileType,
            sourcePath: filePath,
            configPath,
            state: absent ? "file_not_found" : "skipped",
            ...(absent ? {} : { detail: NEVER_STABILIZED }),
          })
        )
        return
      }
      const { content, snapshot } = stable

      if (shouldSkipSelfWrite(hashContent(content), fileState.lastWriteBackContentHash)) return

      if (!looksStructurallyComplete(content)) {
        note(`${name} skipped — ${LOOKS_TRUNCATED}`)
        await args.report(
          preDispatchOperations({
            fileType,
            sourcePath: filePath,
            configPath,
            state: "parse_failed",
            detail: LOOKS_TRUNCATED,
          })
        )
        return
      }

      note(`${name} changed, uploading...`)

      const answer = await args.dispatch({
        fileType,
        content,
        token: args.token,
        serverUrl: args.serverUrl,
        sourcePath: filePath,
        sourceMtimeMs: snapshot.mtimeMs,
        ...configPathAsk(sideFile, configPaths),
      })

      const summary = describeOperations(answer.operations)
      if (!answer.ok) {
        noteFailure(`${name}: ${summary}${answer.error === undefined ? "" : ` — ${answer.error}`}`)
        return
      }

      note(`${name} upload complete — ${summary}`)

      if (sideFile !== undefined) {
        const hash = answer[sideFile.answerHash]
        if (hash !== null) fileState[sideFile.remembered] = hash
      }

      if (answer.writeBack === null) return
      if (!fileUnchanged(filePath, snapshot)) {
        note(`${name} write-back skipped — ${CHANGED_SINCE_STABLE_READ}`)
        return
      }
      writeBackTo(filePath, answer.writeBack)
      fileState.lastWriteBackContentHash = hashContent(answer.writeBack)
      note(`${name} file updated with server write-back`)
    } catch (err) {
      noteFailure(`${name} error: ${messageOf(err)}`)
    } finally {
      fileState.running = false
    }
  }

  return () => {
    if (fileState.running) {
      note(`${name} ${ALREADY_RUNNING}`)
      return
    }

    const at = now()
    if (at - fileState.lastRunTime < DEBOUNCE_MS) return

    fileState.running = true
    fileState.lastRunTime = at

    args.enqueue(run)
  }
}
