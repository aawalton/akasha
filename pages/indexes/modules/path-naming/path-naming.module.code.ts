import { basename } from "node:path"
import type { Answering } from "akasha/pages/indexes/modules/answering/index-answering.module.code.ts"
import {
  importersOf,
  readingIn,
} from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"
import { uncommittedHeld } from "akasha/pages/modules/file-name/page-file-name.module.code.ts"

const UNDER = "/"

export type Reading = { readonly importers: readonly string[] } | { readonly unread: string }

function importedBy(given: string | Answering, from: string): readonly string[] {
  return typeof given === "string" ? importersOf(from, readingIn(given)) : given.importersOf(from)
}

export function importingOf(
  given: string | Answering,
  moved: ReadonlyMap<string, string>
): Reading {
  const found = new Set<string>()
  for (const from of moved.keys()) {
    let said: readonly string[]
    try {
      said = importedBy(given, from)
    } catch (cause) {
      const why = cause instanceof Error ? cause.message : String(cause)
      return { unread: `${why}, so none were repointed` }
    }
    for (const one of said) {
      if (moved.has(one)) continue
      found.add(one)
    }
  }
  return { importers: [...found].sort() }
}

export function namesFor(moved: ReadonlyMap<string, string>): readonly string[] {
  return [...new Set([...moved.keys()].map((one) => basename(one)))]
}

function namesPath(text: string, name: string): boolean {
  for (let at = text.indexOf(name); at >= 0; at = text.indexOf(name, at + 1)) {
    if (text[at - 1] === UNDER || text[at + name.length] === UNDER) return true
  }
  return false
}

export function spellersIn(
  paths: readonly string[],
  textAt: (path: string) => string | null,
  moved: ReadonlyMap<string, string>,
  known: ReadonlySet<string>
): readonly string[] {
  const names = namesFor(moved)
  const found: string[] = []
  for (const path of paths) {
    if (moved.has(path) || known.has(path) || uncommittedHeld(path)) continue
    const text = textAt(path)
    if (text === null) continue
    if (names.some((name) => namesPath(text, name))) found.push(path)
  }
  return found
}
