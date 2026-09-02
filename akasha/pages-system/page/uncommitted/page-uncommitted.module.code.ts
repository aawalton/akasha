import {
  chmodSync,
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import { alive, holderOf, markIn, startedAt } from "@akasha/file-system/lock-holder"
import { exportedAs } from "../export-name/page-export-name.module.code.ts"
import { partedIn, uncommittedAt } from "../file-name/page-file-name.module.code.ts"
import { loadedFrom, type Value } from "../value/page-value.module.code.ts"

const HOLDS = "uncommitted"

const PART = "part"

const HOLDER = "held-by"

const LOCK = "lock"

const WAITED = 5

const WAITED_AT_MOST = 20000

const HELD_AT_MOST = 10000

const MODE_BITS = 0o7777

function abandoned(lock: string, mark: string): boolean {
  const held = holderOf(markIn(mark))
  if (held !== null) return !alive(held)
  const lockAt = statSync(lock, { throwIfNoEntry: false })
  return lockAt !== undefined && Date.now() - lockAt.mtimeMs >= HELD_AT_MOST
}

function taken(lock: string, mine: string): boolean {
  try {
    mkdirSync(lock)
  } catch {
    return false
  }
  try {
    writeFileSync(join(lock, HOLDER), mine, "utf8")
  } catch (thrown) {
    rmSync(lock, { recursive: true, force: true })
    throw thrown
  }
  return true
}

function exclusively<T>(at: string, act: () => T, waited: number = WAITED_AT_MOST): T {
  const lock = `${at}.${LOCK}`
  const mark = join(lock, HOLDER)
  const mine = `${process.pid} ${startedAt(process.pid)}`
  const until = Date.now() + waited
  mkdirSync(dirname(at), { recursive: true })
  while (!taken(lock, mine)) {
    if (Date.now() > until) {
      throw new Error(
        `another writer has held \`${lock}\` for longer than ${Math.round(waited / 1000)}s and ` +
          `is not provably gone, so nothing was written to \`${at}\``
      )
    }
    if (abandoned(lock, mark)) {
      rmSync(lock, { recursive: true, force: true })
      continue
    }
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, WAITED + Math.random() * WAITED)
  }
  try {
    return act()
  } finally {
    if (markIn(mark) === mine) rmSync(lock, { recursive: true, force: true })
  }
}

export function nameFor(page: string): string {
  const said = partedIn(page)
  if (said === null) return HOLDS
  return exportedAs([said.slug, said.pageType, ...said.sections, HOLDS].join("-"))
}

export function bodyFor(page: string, values: Value): string {
  return `export const ${nameFor(page)} = ${JSON.stringify(values, null, 2)} as const\n`
}

function valuesIn(full: string, at: string): Value | null {
  if (!existsSync(full)) return null
  const held = loadedFrom(readFileSync(full, "utf8"))
  if (held.failed !== null) {
    throw new Error(
      `'${at}' stands beside a page and could not be loaded, so what it holds is unknown rather than nothing: ${held.failed}`
    )
  }
  if (held.value === null) {
    throw new Error(
      `'${at}' stands beside a page and declares no values, so what it holds is unknown rather than nothing`
    )
  }
  return held.value
}

type Remembered = {
  readonly at: number
  readonly size: number
  readonly value: Value | null
}

const remembered = new Map<string, Remembered>()

export function uncommittedIn(root: string, page: string): Value | null {
  const at = uncommittedAt(page)
  if (at === null) return null
  const full = join(root, at)
  const found = statSync(full, { throwIfNoEntry: false })
  if (found === undefined) {
    remembered.delete(full)
    return null
  }
  const seen = remembered.get(full)
  if (seen !== undefined && seen.at === found.mtimeMs && seen.size === found.size) return seen.value
  const value = valuesIn(full, at)
  remembered.set(full, { at: found.mtimeMs, size: found.size, value })
  return value
}

export function wholeValue(root: string, page: string, value: Value): Value {
  const beside = uncommittedIn(root, page)
  return beside === null ? value : { ...value, ...beside }
}

function besideOr(page: string): string {
  const at = uncommittedAt(page)
  if (at === null) {
    throw new Error(`'${page}' is no TypeScript file, so nothing stands beside it to hold values`)
  }
  return at
}

function writtenAt(full: string, page: string, values: Value): undefined {
  const scratch = `${full}.${process.pid}.${PART}`
  const found = statSync(full, { throwIfNoEntry: false })
  writeFileSync(scratch, bodyFor(page, values), "utf8")
  if (found !== undefined) chmodSync(scratch, found.mode & MODE_BITS)
  renameSync(scratch, full)
}

export function keepUncommitted(root: string, page: string, values: Value): undefined {
  const full = join(root, besideOr(page))
  exclusively(full, () => writtenAt(full, page, values))
}

export function mergeUncommitted(root: string, page: string, values: Value): undefined {
  const at = besideOr(page)
  const full = join(root, at)
  exclusively(full, () => {
    writtenAt(full, page, { ...(valuesIn(full, at) ?? {}), ...values })
  })
}

export function dropUncommitted(root: string, page: string, keys: readonly string[]): undefined {
  const at = uncommittedAt(page)
  if (at === null) return
  const full = join(root, at)
  exclusively(full, () => {
    const held = valuesIn(full, at)
    if (held === null) return
    const kept: Value = { ...held }
    let dropped = false
    for (const key of keys) {
      if (!(key in kept)) continue
      delete kept[key]
      dropped = true
    }
    if (dropped) writtenAt(full, page, kept)
  })
}

export function removeUncommitted(root: string, page: string): undefined {
  const at = uncommittedAt(page)
  if (at === null) return
  const full = join(root, at)
  exclusively(full, () => {
    rmSync(full, { force: true })
  })
}
