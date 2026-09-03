import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { OperationalError } from "@akasha/errors-core/exit-code"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"
import { pidAliveOrAssumeDead } from "@akasha/utils-process/pid-signal"
import { z } from "zod"
import { watcherConfigDir, watcherLogDir } from "../watcher-paths/watcher-paths.module.code.ts"

export type WatcherDaemonState = {
  readonly pid: number
  readonly startedAt: string
  readonly logPath: string
}

const STATE_SHAPE = z
  .object({
    pid: z.number().int().positive(),
    startedAt: z.string().min(1),
    logPath: z.string().min(1),
  })
  .strict()

export const STATE_FILE = "daemon.json"

export const WORKER_LOG = "watcher.log"

export const ROLLED_LOG = "watcher.1.log"

export const WORKER_ENTRY =
  "akasha/temper/temper-watcher/watcher-worker/watcher-worker.module.code.ts"

export function stateFilePath(): string {
  return join(watcherConfigDir(), STATE_FILE)
}

export function workerLogPath(): string {
  return join(watcherLogDir(), WORKER_LOG)
}

export function readState(): WatcherDaemonState | undefined {
  const path = stateFilePath()
  if (!existsSync(path)) return undefined
  let raw: string
  try {
    raw = readFileSync(path, "utf8")
  } catch {
    return undefined
  }
  try {
    const read = STATE_SHAPE.safeParse(JSON.parse(raw))
    return read.success ? read.data : undefined
  } catch {
    return undefined
  }
}

export function writeState(state: WatcherDaemonState): undefined {
  const path = stateFilePath()
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, `${JSON.stringify(state)}\n`, { mode: 0o600 })
  return undefined
}

export function clearState(): undefined {
  const path = stateFilePath()
  if (existsSync(path)) rmSync(path)
  return undefined
}

export const isPidAlive = pidAliveOrAssumeDead

export function resolveWorkerEntry(): { readonly workerEntry: string; readonly repoRoot: string } {
  const repoRoot = akashaRoot()
  const workerEntry = join(repoRoot, WORKER_ENTRY)
  if (!existsSync(workerEntry)) {
    throw new OperationalError(
      `the watcher worker entry is not at ${workerEntry} (akasha root ${repoRoot})`
    )
  }
  return { workerEntry, repoRoot }
}
