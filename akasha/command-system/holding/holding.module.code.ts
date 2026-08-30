import { closeSync, mkdirSync, openSync, rmSync, statSync, unlinkSync, writeSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  alive,
  holderOf,
  markIn,
  startedAt,
} from "../../file-system/lock-holder/lock-holder.module.code.ts"

export const LOCK_AT = ".git/akasha-landing.lock"

const WAITED_AT_MOST = 120000

const WAITED = 50

const STOOD_TOO_LONG = 10000

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
