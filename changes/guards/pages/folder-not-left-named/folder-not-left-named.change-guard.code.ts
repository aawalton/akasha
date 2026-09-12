import { dirname } from "node:path"
import {
  carriedIn,
  takingIn,
  unreadable,
  writtenIn,
} from "akasha/changes/modules/guarding/change-guarding.module.code.ts"
import type {
  Guard,
  Guarding,
} from "akasha/changes/modules/guarding/change-guarding.module.types.ts"
import { facingHeld } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { namedBy } from "akasha/code/folder-spelling/folder-spelling.module.code.ts"
import { spelledIn } from "akasha/code/modules/specifier/code-specifier.module.code.ts"
import { typed } from "akasha/code/modules/typing/code-typing.module.code.ts"
import { runsIn } from "akasha/code/path-runs/path-runs.module.code.ts"
import {
  generatedIn,
  groupWrites,
} from "akasha/pages/indexes/property-carrying/property-carrying.module.code.ts"

const UNDER = "/"

const HERE = "."

function holdingIn(every: readonly string[]): ReadonlySet<string> {
  const found = new Set<string>()
  for (const one of every) {
    for (let at = dirname(one); at !== HERE && at !== UNDER; at = dirname(at)) {
      if (found.has(at)) break
      found.add(at)
    }
  }
  return found
}

function topmostIn(holding: ReadonlySet<string>, path: string): string | null {
  let found: string | null = null
  for (let at = dirname(path); at !== HERE && at !== UNDER; at = dirname(at)) {
    if (holding.has(at)) return found
    found = at
  }
  return found
}

function emptiedIn(holding: ReadonlySet<string>, gone: readonly string[]): readonly string[] {
  const found = new Set<string>()
  for (const one of gone) {
    const at = topmostIn(holding, one)
    if (at !== null) found.add(at)
  }
  return [...found].sort()
}

function tailsIn(said: readonly string[], root: string): readonly string[] {
  const whole = said[0]
  if (whole === undefined || !whole.startsWith(UNDER)) return said
  const under = `${root}${UNDER}`
  return whole.startsWith(under) ? [whole.slice(under.length)] : []
}

function saidIn(path: string, text: string, root: string): readonly string[] {
  if (typed(path)) return spelledIn(path, text).map((one) => one.text)
  return runsIn(text).flatMap((one) => tailsIn(one.said, root))
}

function spellingIn(
  path: string,
  text: string,
  folders: readonly string[],
  root: string
): string | null {
  if (!folders.some((one) => text.includes(one))) return null
  for (const said of saidIn(path, text, root)) {
    const at = namedBy(said, folders)
    if (at === null) continue
    return `\`${path}\` spells \`${said}\`, and \`${at}\` holds nothing after`
  }
  return null
}

function namingIn(given: Guarding, folders: readonly string[]): string | null {
  const facing = facingHeld(given.before)
  for (const [path, text] of writtenIn(given)) {
    if (generatedIn(facing, path) || groupWrites(facing, path)) continue
    const why = spellingIn(path, text, folders, given.before.root)
    if (why !== null) return why
  }
  return null
}

export function folderNotLeftNamed(given: Guarding): string | null {
  const gone = [...takingIn(given.said), ...carriedIn(given.said)]
  if (gone.length === 0) return null
  try {
    const folders = emptiedIn(holdingIn(given.shadow.index.everyPath()), gone)
    return folders.length === 0 ? null : namingIn(given, folders)
  } catch (cause) {
    return unreadable(cause)
  }
}

export const runGuard: Guard = folderNotLeftNamed
