import { dirname } from "node:path"
import { spelledIn } from "@akasha/code/code-specifier"
import { typed } from "@akasha/code/code-typing"
import {
  carriedIn,
  takingIn,
  unreadable,
  writtenIn,
} from "../../../modules/guarding/change-guarding.module.code.ts"
import type { Guard, Guarding } from "../../../modules/guarding/change-guarding.module.types.ts"

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

function namedBy(said: string, folders: readonly string[]): string | null {
  if (!said.includes(UNDER)) return null
  for (const at of folders) {
    if (said === at || said.startsWith(`${at}${UNDER}`)) return at
  }
  return null
}

function spellingIn(path: string, text: string, folders: readonly string[]): string | null {
  if (!folders.some((one) => text.includes(one))) return null
  for (const one of spelledIn(path, text)) {
    const at = namedBy(one.text, folders)
    if (at === null) continue
    return `\`${path}\` spells \`${one.text}\`, and \`${at}\` holds nothing after`
  }
  return null
}

function namingIn(given: Guarding, folders: readonly string[]): string | null {
  for (const [path, text] of writtenIn(given)) {
    if (!typed(path)) continue
    const why = spellingIn(path, text, folders)
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
