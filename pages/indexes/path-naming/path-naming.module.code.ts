import { basename } from "node:path"
import { textOf } from "akasha/commands/modules/body-reaching/body-reaching.module.code.ts"
import { bodyAt } from "akasha/git/commit-reading/commit-reading.module.code.ts"
import { uncommittedHeld } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Answering } from "akasha/pages/indexes/answering/index-answering.module.code.ts"
import type { Listed } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import {
  everyPath,
  importersOf,
  listedByPath,
  readingIn,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"

export type Naming = { readonly held: Listed | null } | { readonly unread: string }

export type Reading = { readonly importers: readonly string[] } | { readonly unread: string }

export function namingOf(root: string, path: string): Naming {
  let listed: readonly Listed[]
  try {
    listed = listedByPath(root, path)
  } catch (cause) {
    return { unread: cause instanceof Error ? cause.message : String(cause) }
  }
  if (listed.length > 1) {
    return {
      unread:
        `the index answers ${listed.length} pages to the path \`${path}\`, so what names it ` +
        "could not be answered",
    }
  }
  return { held: listed[0] ?? null }
}

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

export function spellersIn(
  paths: readonly string[],
  textAt: (path: string) => string | null,
  moved: ReadonlyMap<string, string>,
  known: ReadonlySet<string>
): readonly string[] {
  const names = [...new Set([...moved.keys()].map((one) => basename(one)))]
  const found: string[] = []
  for (const path of paths) {
    if (moved.has(path) || known.has(path) || uncommittedHeld(path)) continue
    const text = textAt(path)
    if (text === null) continue
    if (names.some((name) => text.includes(name))) found.push(path)
  }
  return found
}

export function spellingOf(
  root: string,
  base: string,
  moved: ReadonlyMap<string, string>,
  known: ReadonlySet<string>
): readonly string[] {
  const said = (path: string): string | null => {
    const held = bodyAt(root, base, path)
    return held === null ? null : textOf(held)
  }
  return spellersIn(everyPath(root), said, moved, known)
}
