import { mkdirSync, openSync } from "node:fs"
import { dirname } from "node:path"
import { OperationalError } from "@akasha/errors-core/exit-code"
import {
  clearState,
  isPidAlive,
  readState,
  resolveWorkerEntry,
  type WatcherDaemonState,
  workerLogPath,
  writeState,
} from "../watcher-daemon/watcher-daemon.module.code.ts"

export const FROM_SOURCE = "source"

export async function runWatcherWorker(): Promise<number> {
  const held = readState()
  if (held !== undefined && isPidAlive(held.pid)) {
    throw new OperationalError(
      `a watcher worker is already running as pid ${held.pid}, so a second one is refused; restart the temper-watcher service instead`
    )
  }

  const { workerEntry, repoRoot } = resolveWorkerEntry()
  const logPath = workerLogPath()
  mkdirSync(dirname(logPath), { recursive: true })
  const logFd = openSync(logPath, "a", 0o600)

  let worker: Bun.Subprocess<"ignore", number, number>
  try {
    worker = Bun.spawn(["bun", "run", workerEntry], {
      cwd: repoRoot,
      env: { ...process.env, WATCHER_RUNTIME: FROM_SOURCE },
      stdin: "ignore",
      stdout: logFd,
      stderr: logFd,
    })
  } catch (thrown) {
    throw new OperationalError(
      `the watcher worker did not start: ${thrown instanceof Error ? thrown.message : String(thrown)}`
    )
  }

  const state: WatcherDaemonState = {
    pid: worker.pid,
    startedAt: new Date().toISOString(),
    logPath,
  }
  writeState(state)
  process.stdout.write(`the watcher worker runs as pid ${state.pid}, logging to ${state.logPath}\n`)

  let signalled = false
  const forward = (signal: NodeJS.Signals): undefined => {
    signalled = true
    try {
      worker.kill(signal)
    } catch {
      return undefined
    }
    return undefined
  }
  process.on("SIGTERM", () => forward("SIGTERM"))
  process.on("SIGINT", () => forward("SIGINT"))

  const ended = await worker.exited
  clearState()
  return signalled ? 0 : ended
}

if (import.meta.main) {
  try {
    process.exit(await runWatcherWorker())
  } catch (thrown) {
    process.stderr.write(`${thrown instanceof Error ? thrown.message : String(thrown)}\n`)
    process.exit(3)
  }
}
