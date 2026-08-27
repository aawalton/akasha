export const tool = {
  summary: "Run the Temper ESO SavedVariables watcher worker in the foreground until it exits or is signalled",
  repos: ["akasha"],
} as const

import { mkdirSync, openSync } from "node:fs"
import { dirname } from "node:path"
import { operationalError } from "../tools/lib/exit.ts"
import {
  clearState,
  isPidAlive,
  readState,
  resolveWorkerEntry,
  type WatcherDaemonState,
  workerLogPath,
  writeState,
} from "../tools/lib/temper-watcher-daemon.ts"

const HELP = `bun services/temper-watcher.ts — run the Temper ESO SavedVariables watcher worker

Runs the worker in the FOREGROUND, blocking until it exits or this process is signalled,
which is the shape a Type=simple unit needs. The worker runs from source through
\`bun run\` with \`WATCHER_RUNTIME=source\`, and its stdout and stderr append to the worker
log.

IT WRITES THE STATE FILE \`ops temper watcher status\` AND \`logs\` READ, so both report on
the worker this put there.

ONE WORKER AT A TIME. A live daemon already tracked in the state file is refused rather
than doubled; \`ops service restart temper-watcher\` or \`ops service stop temper-watcher\`
is the way through.

ON SIGTERM OR SIGINT the signal is forwarded to the worker, the state file is cleared, and
a clean stop exits 0.

Usage:
  bun ~/repos/akasha/services/temper-watcher.ts [--json]

  --json  Emit the startup line as \`{ ok, pid, log_path }\` instead of \`pid=<n> log=<path>\`.
  --help  This.

Exits:
  3  operational — a watcher is already running, the worker entry is missing, or the spawn failed
`

async function main(argv: readonly string[]): Promise<number> {
  if (argv.includes("--help")) {
    process.stdout.write(HELP)
    return 0
  }
  const json = argv.includes("--json")

  const existing = readState()
  if (existing !== undefined && isPidAlive(existing.pid)) {
    throw operationalError(
      `watcher already running (pid ${existing.pid}); use \`ops service restart temper-watcher\` first`
    )
  }

  const { workerEntry, repoRoot } = resolveWorkerEntry()
  const logPath = workerLogPath()
  mkdirSync(dirname(logPath), { recursive: true })
  const logFd = openSync(logPath, "a", 0o600)

  let proc: Bun.Subprocess<"ignore", number, number>
  try {
    proc = Bun.spawn(["bun", "run", workerEntry], {
      cwd: repoRoot,
      env: { ...process.env, WATCHER_RUNTIME: "source" },
      stdin: "ignore",
      stdout: logFd,
      stderr: logFd,
    })
  } catch (err) {
    throw operationalError(
      `failed to spawn watcher worker: ${err instanceof Error ? err.message : String(err)}`
    )
  }

  const state: WatcherDaemonState = {
    pid: proc.pid,
    startedAt: new Date().toISOString(),
    logPath,
  }
  writeState(state)

  if (json) {
    process.stdout.write(
      `${JSON.stringify({ ok: true, pid: state.pid, log_path: state.logPath })}\n`
    )
  } else {
    process.stdout.write(`pid=${state.pid} log=${state.logPath}\n`)
  }

  let signalled = false
  const forward = (signal: NodeJS.Signals): undefined => {
    signalled = true
    try {
      proc.kill(signal)
    } catch {
    }
  }
  process.on("SIGTERM", () => forward("SIGTERM"))
  process.on("SIGINT", () => forward("SIGINT"))

  const code = await proc.exited
  clearState()
  return signalled ? 0 : code
}

if (import.meta.main) process.exit(await main(process.argv.slice(2)))
