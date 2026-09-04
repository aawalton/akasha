import { basename } from "node:path"
import { typed } from "@akasha/code-system/code-typing"
import type { Listed } from "@akasha/indexes"
import { everyPath, importersOf, listedByPath, readingIn } from "@akasha/indexes"
import { textOf } from "../../../asking/asking.module.code.ts"
import { bodyAt } from "../../../commit-reading/commit-reading.module.code.ts"

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

export function importingOf(root: string, moved: ReadonlyMap<string, string>): Reading {
  const found = new Set<string>()
  for (const from of moved.keys()) {
    let said: readonly string[]
    try {
      said = importersOf(root, from, readingIn(root))
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

export function spellingOf(
  root: string,
  base: string,
  moved: ReadonlyMap<string, string>,
  known: ReadonlySet<string>
): readonly string[] {
  const names = [...new Set([...moved.keys()].map((one) => basename(one)))]
  const found: string[] = []
  for (const path of everyPath(root)) {
    if (!typed(path) || moved.has(path) || known.has(path)) continue
    const held = bodyAt(root, base, path)
    if (held === null) continue
    const text = textOf(held)
    if (text === null) continue
    if (names.some((name) => text.includes(name))) found.push(path)
  }
  return found
}
