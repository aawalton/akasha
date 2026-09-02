import { buildConfig, type WatcherConfig } from "../watcher-config/watcher-config.module.code.ts"
import type {
  DispatchAnswer,
  DispatchHandlerArgs,
} from "../watcher-dispatch-handling/watcher-dispatch-handling.module.code.ts"
import type { FileType } from "../watcher-file-type/watcher-file-type.module.code.ts"
import { initialFileState } from "../watcher-state/watcher-state.module.code.ts"
import {
  type Dispatching,
  type InventorySync,
  type OpenSession,
  type SessionAnswer,
  startWatcher,
  type UpdateAttempt,
  type UpdateCheck,
  type Updating,
  type WatcherStart,
  type WatcherStartOptions,
} from "./watcher-main.module.code.ts"

export const SCRATCH_AT = "/var/tmp"

export const LIVE = `${SCRATCH_AT}/watcher-main-probe/live`

export const CAPTURED_BASENAMES = [
  "TemperCatalog.lua",
  "TemperCharacters.lua",
  "TemperCompanions.lua",
  "TemperDataMining.lua",
  "TemperErrors.lua",
  "TemperInventory.lua",
  "TemperSales.lua",
] as const

export const LEGACY_LABELS = [
  "Catalog",
  "Characters",
  "Companions",
  "DataMining",
  "Errors",
  "Inventory",
  "Sales",
] as const

export const SOURCE_KEY_FOR_TEST = {
  catalog: "temperCatalogPath",
  characters: "temperCharactersPath",
  companions: "temperCompanionsPath",
  "data-mining": "dataMiningPath",
  errors: "temperErrorsPath",
  inventory: "inventoryPath",
  sales: "temperSalesPath",
} as const satisfies Record<FileType, keyof WatcherConfig>

export const CONFIG = buildConfig({
  savedVarsDir: `${LIVE}/SavedVariables`,
  addonsDir: `${LIVE}/AddOns`,
})

export interface Said {
  readonly info: string[]
  readonly error: string[]
}

export function lines(): Said {
  return { info: [], error: [] }
}

export function updating(check: UpdateCheck, over: Partial<Updating> = {}): Updating {
  return {
    sourceUpdateExitCode: 75,
    checkForUpdate: () => Promise.resolve(check),
    performSourceUpdate: () => ({ advanced: false, reason: "up-to-date" }),
    performUpdate: () => Promise.resolve(),
    resolveSourceHeadSha: () => "abcdef0123456789",
    cleanupOldExe: () => undefined,
    ...over,
  }
}

export function answerOf(user: { id: string; email?: string | null } | null): SessionAnswer {
  return { data: { user }, error: user === null ? { message: "no session" } : null }
}

export function sourceUpdateTo(version: string, advanced: boolean, reason: string): Updating {
  return updating(
    { kind: "update-available", version },
    { performSourceUpdate: () => ({ advanced, reason }) }
  )
}

export function downloading(
  version: string,
  performUpdate: (serverUrl: string) => Promise<void>
): Updating {
  return updating({ kind: "update-available", version }, { performUpdate })
}

export const NO_ANSWER = {
  ok: true,
  operations: [],
  writeBack: null,
  inventoryConfigSideFileHash: null,
  charactersConfigSideFileHash: null,
  companionsConfigSideFileHash: null,
} as const

export function dispatched(over: Partial<DispatchAnswer> = {}): Dispatching {
  return () => Promise.resolve({ ...NO_ANSWER, ...over })
}

export function checksInTurn(
  turns: readonly UpdateCheck[],
  over: Partial<Updating> = {}
): Updating {
  let asked = 0
  return updating(
    { kind: "up-to-date" },
    {
      checkForUpdate: () => {
        const turn = turns[Math.min(asked, turns.length - 1)]
        asked += 1
        if (turn === undefined) throw new Error("no update check was prepared")
        return Promise.resolve(turn)
      },
      ...over,
    }
  )
}

export function sessionOf(
  answers: readonly SessionAnswer[],
  setError: { message: string } | null = null
): OpenSession {
  let asked = 0
  return () =>
    Promise.resolve({
      auth: {
        getUser: () => {
          const answer = answers[Math.min(asked, answers.length - 1)]
          asked += 1
          if (answer === undefined) throw new Error("no answer was prepared")
          return Promise.resolve(answer)
        },
        setSession: () => Promise.resolve({ error: setError }),
      },
    })
}

export interface Started {
  readonly said: Said
  readonly start: WatcherStart
}

export async function startWith(over: Partial<WatcherStartOptions> = {}): Promise<Started> {
  const said = lines()
  const start = await startWatcher(options(said, over))
  return { said, start }
}

export interface CountedChecks {
  readonly started: Promise<WatcherStart>
  readonly checksSoFar: () => number
  readonly handler: () => DispatchHandlerArgs
}

export function counted(said: Said, clock: () => number): CountedChecks {
  let checks = 0
  let handed: DispatchHandlerArgs | null = null
  const started = startWatcher(
    options(said, {
      now: clock,
      updating: updating(
        { kind: "up-to-date" },
        {
          checkForUpdate: () => {
            checks += 1
            return Promise.resolve<UpdateCheck>({ kind: "up-to-date" })
          },
        }
      ),
      makeDispatchHandler: (args: DispatchHandlerArgs) => {
        handed = args
        return () => undefined
      },
    })
  )
  return {
    started,
    checksSoFar: () => checks,
    handler: () => {
      const args: DispatchHandlerArgs | null = handed
      if (args === null) throw new Error("no handler was made")
      return args
    },
  }
}

export function options(said: Said, over: Partial<WatcherStartOptions> = {}): WatcherStartOptions {
  return {
    repoDir: `${SCRATCH_AT}/watcher-main-repo`,
    serverUrl: () => "https://server.test",
    authenticate: () =>
      Promise.resolve({
        serverUrl: "https://authed.test",
        session: { access_token: "a", refresh_token: "r" },
      }),
    openSession: () =>
      Promise.resolve({
        auth: {
          getUser: () => Promise.resolve(answerOf({ id: "u1", email: "alan@example.test" })),
          setSession: () => Promise.resolve({ error: null }),
        },
      }),
    dispatch: dispatched(),
    report: () => Promise.resolve(),
    makeDispatchHandler: () => () => undefined,
    updating: updating({ kind: "up-to-date" }),
    enqueueUpload: () => undefined,
    onExitWanted: () => undefined,
    now: () => 1_000_000,
    isThere: () => true,
    watch: () => () => undefined,
    repeatEvery: () => () => undefined,
    readWhenStable: () => Promise.resolve(null),
    stillMatches: () => true,
    writeBack: () => undefined,
    buildConfig: () => CONFIG,
    resolveToken: () => "wt_token",
    sourceRuntime: () => false,
    version: "v-test",
    log: (m) => {
      said.info.push(m)
      return undefined
    },
    logError: (m) => {
      said.error.push(m)
      return undefined
    },
    ...over,
  }
}

export function attemptOf(said: Said, over: Partial<UpdateAttempt> = {}): UpdateAttempt {
  return {
    serverUrl: "https://server.test",
    runningVersion: "0123456789abcdef",
    repoDir: `${SCRATCH_AT}/watcher-main-repo`,
    fromSource: false,
    updating: updating({ kind: "up-to-date" }),
    log: (m: string) => {
      said.info.push(m)
      return undefined
    },
    logError: (m: string) => {
      said.error.push(m)
      return undefined
    },
    ...over,
  }
}

export function syncOf(
  said: Said,
  written: string[],
  over: Partial<InventorySync> = {}
): InventorySync {
  return {
    inventoryPath: CONFIG.inventoryPath,
    inventoryConfigPath: CONFIG.inventoryConfigPath,
    wtToken: "wt_token",
    serverUrl: "https://server.test",
    fileState: initialFileState(),
    dispatch: dispatched(),
    readWhenStable: () => Promise.resolve({ content: "{ }", snapshot: { size: 3, mtimeMs: 5 } }),
    stillMatches: () => true,
    writeBack: (_path: string, content: string) => {
      written.push(content)
      return undefined
    },
    log: (m: string) => {
      said.info.push(m)
      return undefined
    },
    logError: (m: string) => {
      said.error.push(m)
      return undefined
    },
    ...over,
  }
}
