import {
  closeSync,
  mkdirSync,
  openSync,
  readFileSync,
  rmSync,
  statSync,
  unlinkSync,
  writeSync,
} from "node:fs"
import { dirname, join } from "node:path"

export const LOCK_AT = ".git/akasha-landing.lock"

const WAITED_AT_MOST = 120000

const WAITED = 50

const STOOD_TOO_LONG = 10000

const UNKNOWN = "-"

const STARTED = 19

type Holder = {
  readonly pid: number
  readonly started: string
}

export function startedAt(pid: number): string {
  try {
    const said = readFileSync(`/proc/${pid}/stat`, "utf8")
    const fields = said
      .slice(said.lastIndexOf(")") + 1)
      .trim()
      .split(/\s+/)
    return fields[STARTED] ?? UNKNOWN
  } catch {
    return UNKNOWN
  }
}

export function markIn(at: string): string | null {
  try {
    const said = readFileSync(at, "utf8").trim()
    return said === "" ? null : said
  } catch {
    return null
  }
}

export function holderOf(mark: string | null): Holder | null {
  if (mark === null) return null
  const [said, started] = mark.split(" ")
  const pid = Number.parseInt(said ?? "", 10)
  if (Number.isNaN(pid) || pid < 1) return null
  return { pid, started: started === undefined || started === "" ? UNKNOWN : started }
}

export function alive(held: Holder): boolean {
  try {
    process.kill(held.pid, 0)
  } catch {
    return false
  }
  const started = startedAt(held.pid)
  return held.started === UNKNOWN || started === UNKNOWN || started === held.started
}

function agedOut(at: string): boolean {
  try {
    return Date.now() - statSync(at).mtimeMs >= STOOD_TOO_LONG
  } catch {
    return false
  }
}

function abandoned(at: string): boolean {
  const held = holderOf(markIn(at))
  return held === null ? agedOut(at) : !alive(held)
}

function taken(at: string, mine: string): boolean {
  try {
    const held = openSync(at, "wx")
    writeSync(held, mine)
    closeSync(held)
    return true
  } catch {
    return false
  }
}

export function holding<T>(root: string, act: () => T, waited: number = WAITED_AT_MOST): T {
  const at = join(root, LOCK_AT)
  mkdirSync(dirname(at), { recursive: true })
  const mine = `${process.pid} ${startedAt(process.pid)}`
  const until = Date.now() + waited
  while (!taken(at, mine)) {
    if (abandoned(at)) {
      rmSync(at, { force: true })
      continue
    }
    if (Date.now() > until) {
      throw new Error(
        `another landing has held \`${LOCK_AT}\` for longer than ${Math.round(waited / 1000)}s, so this change was not judged and nothing was written`
      )
    }
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, WAITED)
  }
  try {
    return act()
  } finally {
    if (markIn(at) === mine) {
      try {
        unlinkSync(at)
      } catch {}
    }
  }
}
