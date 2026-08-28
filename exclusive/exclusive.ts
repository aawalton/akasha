import { mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs"

const SPIN_MS = 5
const WAIT_MS = 20_000
const STALE_MS = 10_000
const HOLDER = "held-by"
const UNKNOWN = "-"

interface Holder {
  readonly pid: number
  readonly started: string | null
}

function pause(ms: number): void {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
}

function startedAt(pid: number): string | null {
  try {
    const stat = readFileSync(`/proc/${pid}/stat`, "utf8")
    const fields = stat.slice(stat.lastIndexOf(")") + 1).trim().split(/\s+/)
    return fields[19] ?? null
  } catch {
    return null
  }
}

function markIn(file: string): string | null {
  try {
    const written = readFileSync(file, "utf8").trim()
    return written === "" ? null : written
  } catch {
    return null
  }
}

function holderOf(mark: string): Holder | null {
  const [said, started] = mark.split(" ")
  const pid = Number(said)
  if (!Number.isInteger(pid) || pid < 1) return null
  return { pid, started: started === undefined || started === UNKNOWN ? null : started }
}

function running(holder: Holder): boolean {
  try {
    process.kill(holder.pid, 0)
  } catch (failed) {
    return (failed as NodeJS.ErrnoException).code !== "ESRCH"
  }
  const started = startedAt(holder.pid)
  return holder.started === null || started === null || started === holder.started
}

function agedOut(lock: string): boolean {
  try {
    return Date.now() - statSync(lock).mtimeMs >= STALE_MS
  } catch {
    return false
  }
}

function abandoned(lock: string, file: string): boolean {
  const mark = markIn(file)
  const holder = mark === null ? null : holderOf(mark)
  return holder === null ? agedOut(lock) : !running(holder)
}

export function exclusively<T>(path: string, act: () => T, waitMs: number = WAIT_MS): T {
  const lock = `${path}.lock`
  const file = `${lock}/${HOLDER}`
  const mine = `${process.pid} ${startedAt(process.pid) ?? UNKNOWN}`
  const until = Date.now() + waitMs
  for (;;) {
    let made = true
    try {
      mkdirSync(lock)
    } catch {
      made = false
    }
    if (made) {
      try {
        writeFileSync(file, mine, "utf8")
      } catch (failed) {
        rmSync(lock, { recursive: true, force: true })
        throw failed
      }
      break
    }
    if (Date.now() >= until) {
      throw new Error(
        `${lock} did not come free inside ${String(waitMs)}ms and its holder is not provably ` +
          `gone, so nothing was written to ${path}`
      )
    }
    if (abandoned(lock, file)) {
      const gone = markIn(file)
      try {
        rmSync(lock, { recursive: true, force: true })
        process.stderr.write(
          `exclusive: broke ${lock} — its holder ${gone ?? "was never recorded"} is gone, so ` +
            "the lock was never going to come free on its own\n"
        )
        continue
      } catch {
      }
    }
    pause(SPIN_MS + Math.floor(Math.random() * SPIN_MS))
  }
  try {
    return act()
  } finally {
    if (markIn(file) === mine) rmSync(lock, { recursive: true, force: true })
  }
}
