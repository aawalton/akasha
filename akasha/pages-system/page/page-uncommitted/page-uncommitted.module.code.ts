import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { dirname, join } from "node:path"
import {
  alive,
  holderOf,
  markIn,
  startedAt,
} from "../../../command-system/holding/holding.module.code.ts"
import { loadedFrom, type Value } from "../../indexes/index-entries/index-entries.module.code.ts"
import { exportedAs } from "../page-export-name/page-export-name.module.code.ts"
import { namedIn, uncommittedAt } from "../page-file-name/page-file-name.module.code.ts"

const HOLDS = "uncommitted"

const PART = "part"

const HOLDER = "held-by"

const LOCK = "lock"

const WAITED = 5

const WAITED_AT_MOST = 20000

const STOOD_TOO_LONG = 10000

function abandoned(lock: string, mark: string): boolean {
  const held = holderOf(markIn(mark))
  if (held !== null) return !alive(held)
  const stood = statSync(lock, { throwIfNoEntry: false })
  return stood !== undefined && Date.now() - stood.mtimeMs >= STOOD_TOO_LONG
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
  const said = namedIn(page)
  if (said === null) return HOLDS
  return exportedAs(`${said.stem.replaceAll(".", "-")}-${said.tail}-${HOLDS}`)
}

export function bodyFor(page: string, values: Value): string {
  return `export const ${nameFor(page)} = ${JSON.stringify(values, null, 2)} as const\n`
}

function standingIn(full: string, at: string): Value | null {
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

export function uncommittedIn(root: string, page: string): Value | null {
  const at = uncommittedAt(page)
  if (at === null) return null
  return standingIn(join(root, at), at)
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
  writeFileSync(scratch, bodyFor(page, values), "utf8")
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
    writtenAt(full, page, { ...(standingIn(full, at) ?? {}), ...values })
  })
}

export function dropUncommitted(root: string, page: string, keys: readonly string[]): undefined {
  const at = uncommittedAt(page)
  if (at === null) return
  const full = join(root, at)
  exclusively(full, () => {
    const held = standingIn(full, at)
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
