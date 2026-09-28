import { mkdirSync, rmSync, statSync, writeFileSync } from "node:fs"
import { pause } from "akasha/code/modules/thread-pause/thread-pause.module.code.ts"
import { errnoCodeOf } from "akasha/code/process/modules/pid-signal/pid-signal.module.code.ts"
import {
  alive,
  holderOf,
  markIn,
  startedAt,
} from "akasha/file/modules/lock-holder/lock-holder.module.code.ts"

const SPIN_MS = 5

const WAIT_MS = 20_000

const STALE_MS = 10_000

const HOLDER = "held-by"

const HELD_ALREADY = "EEXIST"

function agedOut(lock: string): boolean {
  try {
    return Date.now() - statSync(lock).mtimeMs >= STALE_MS
  } catch {
    return false
  }
}

function abandoned(lock: string, file: string): boolean {
  const held = holderOf(markIn(file))
  return held === null ? agedOut(lock) : !alive(held)
}

function broke(lock: string, gone: string | null): boolean {
  try {
    rmSync(lock, { recursive: true, force: true })
  } catch {
    return false
  }
  process.stderr.write(
    `exclusive: broke ${lock} — its holder ${gone ?? "was never recorded"} is gone, so ` +
      "the lock was never going to come free on its own\n"
  )
  return true
}

function took(lock: string, file: string, mine: string): boolean {
  try {
    mkdirSync(lock)
  } catch (failed) {
    if (errnoCodeOf(failed) === HELD_ALREADY) return false
    throw new Error(
      `${lock} could not be made, and no holder has it, so waiting would not help: ` +
        String(failed),
      { cause: failed }
    )
  }
  try {
    writeFileSync(file, mine, "utf8")
  } catch (failed) {
    rmSync(lock, { recursive: true, force: true })
    throw failed
  }
  return true
}

export function exclusively<T>(path: string, act: () => T, waitMs: number = WAIT_MS): T {
  const lock = `${path}.lock`
  const file = `${lock}/${HOLDER}`
  const mine = `${process.pid} ${startedAt(process.pid)}`
  const until = Date.now() + waitMs
  while (!took(lock, file, mine)) {
    if (Date.now() >= until) {
      throw new Error(
        `${lock} did not come free inside ${String(waitMs)}ms and its holder is not provably ` +
          `gone, so nothing was written to ${path}`
      )
    }
    if (abandoned(lock, file) && broke(lock, markIn(file))) continue
    pause(SPIN_MS + Math.floor(Math.random() * SPIN_MS))
  }
  const give = (): undefined => {
    if (markIn(file) === mine) rmSync(lock, { recursive: true, force: true })
  }
  let held: T
  try {
    held = act()
  } catch (failed) {
    give()
    throw failed
  }
  if (held instanceof Promise) return held.finally(give) as T
  give()
  return held
}
