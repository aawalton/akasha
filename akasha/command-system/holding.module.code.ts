import {
  closeSync,
  mkdirSync,
  openSync,
  readFileSync,
  rmSync,
  unlinkSync,
  writeSync,
} from "node:fs"
import { dirname, join } from "node:path"

export const LOCK_AT = ".git/akasha-landing.lock"

const HELD_FOR = 120000

const WAITED = 50

function heldBy(at: string): number | null {
  try {
    const first = readFileSync(at, "utf8").trim().split(" ")[0]
    if (first === undefined) return null
    const pid = Number.parseInt(first, 10)
    return Number.isNaN(pid) ? null : pid
  } catch {
    return null
  }
}

function alive(pid: number): boolean {
  try {
    process.kill(pid, 0)
    return true
  } catch {
    return false
  }
}

function taken(at: string): boolean {
  try {
    const held = openSync(at, "wx")
    writeSync(held, `${process.pid} ${Date.now()}`)
    closeSync(held)
    return true
  } catch {
    return false
  }
}

export function holding<T>(root: string, act: () => T, waited: number = HELD_FOR): T {
  const at = join(root, LOCK_AT)
  mkdirSync(dirname(at), { recursive: true })
  const until = Date.now() + waited
  while (!taken(at)) {
    const pid = heldBy(at)
    if (pid !== null && !alive(pid)) {
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
    try {
      unlinkSync(at)
    } catch {}
  }
}
