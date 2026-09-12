import { closeSync, mkdirSync, openSync, rmSync, statSync, unlinkSync, writeSync } from "node:fs"
import { dirname, join } from "node:path"
import { EXIT } from "akasha/alan/harness/errors-core/exit-code/exit-code.module.code.ts"
import { keptAt, LANDING_LOCK } from "akasha/files/git-place/git-place.module.code.ts"
import {
  alive,
  holderOf,
  markIn,
  startedAt,
} from "akasha/files/lock-holder/lock-holder.module.code.ts"

export const LOCK_AT = keptAt(LANDING_LOCK)

export const WAITED_AT_MOST = 300000

const WAITED = 5

const AGED_AFTER = 10000

function agedOut(at: string): boolean {
  try {
    return Date.now() - statSync(at).mtimeMs >= AGED_AFTER
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

export class HeldTooLong extends Error {}

export function heldSaid(waited: number): string {
  return `another landing has held \`${LOCK_AT}\` for longer than ${Math.round(waited / 1000)}s, so this change was not judged and nothing was written`
}

export type Held = {
  readonly refusals: readonly string[]
  readonly code: number
}

export async function refusedWhereHeld<T>(act: () => Promise<T>): Promise<T | Held> {
  try {
    return await act()
  } catch (thrown) {
    if (thrown instanceof HeldTooLong) {
      return { refusals: [thrown.message], code: EXIT.OPERATIONAL }
    }
    throw thrown
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
      throw new HeldTooLong(heldSaid(waited))
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
