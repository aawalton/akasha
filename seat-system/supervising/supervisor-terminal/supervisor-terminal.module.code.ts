import { spawnSync } from "node:child_process"
import { writeSync } from "node:fs"
import type { LogSink } from "../supervisor-console/supervisor-console.module.code.ts"

const OSC_BACKGROUND_RESET = "\x1b]111\x07"

export const TERMINAL_MODE_RESET = "\x1b[<u\x1b[>4;0m"

export function recordTermiosState(tag: string, getSink: () => LogSink): undefined {
  const ts = new Date().toISOString()
  const isatty = `0,1,2:${process.stdin.isTTY === true ? "T" : "F"},${process.stdout.isTTY === true ? "T" : "F"},${process.stderr.isTTY === true ? "T" : "F"}`
  let stty: string
  try {
    const r = spawnSync("stty", ["-a", "-F", "/dev/tty"], {
      stdio: ["ignore", "pipe", "pipe"],
      encoding: "utf8",
    })
    if (r.status === 0 && typeof r.stdout === "string") {
      stty = r.stdout.replace(/\s+/g, " ").trim()
    } else {
      const err =
        typeof r.stderr === "string" ? r.stderr.replace(/\s+/g, " ").trim() : "(no-stderr)"
      stty = `(stty-failed status=${r.status ?? "null"} err=${err})`
    }
  } catch (err) {
    stty = `(stty-throw ${err instanceof Error ? err.message : String(err)})`
  }
  try {
    getSink()("TERMIOS", `at=${ts} tag=${tag} isatty=${isatty} stty=${stty}`)
  } catch {}
}

export function applySttySane(): undefined {
  if (process.stdin.isTTY !== true) return
  try {
    spawnSync("stty", ["sane", "-F", "/dev/tty"], { stdio: "ignore" })
  } catch {}
}

let installed = false

export function installSupervisorTerminalGuard(opts: {
  shutdown: (signal: string) => Promise<void>
  isClaudeAlive: () => boolean
  getSink: () => LogSink
}): undefined {
  if (installed) return
  installed = true

  recordTermiosState("install", opts.getSink)

  try {
    writeSync(1, OSC_BACKGROUND_RESET)
  } catch {}

  process.on("exit", () => {
    recordTermiosState("exit-handler-entry", opts.getSink)
    try {
      writeSync(1, TERMINAL_MODE_RESET)
    } catch {}
    applySttySane()
    try {
      writeSync(1, OSC_BACKGROUND_RESET)
    } catch {}
    recordTermiosState("exit-handler-post-restore", opts.getSink)
  })

  let shuttingDown = false
  function handle(signal: NodeJS.Signals): undefined {
    recordTermiosState(`signal-${signal}-shuttingDown=${shuttingDown}`, opts.getSink)
    if (shuttingDown) {
      if (signal === "SIGINT") process.exit(130)
      return
    }
    if (signal === "SIGINT" && opts.isClaudeAlive()) {
      return
    }
    shuttingDown = true
    void opts.shutdown(signal)
  }
  process.on("SIGINT", () => handle("SIGINT"))
  process.on("SIGTERM", () => handle("SIGTERM"))
}
