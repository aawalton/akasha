import { existsSync } from "node:fs"
import { join } from "node:path"
import { pathsOf } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { FileChange } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { uncommittedHeld } from "akasha/pages/file-name/page-file-name.module.code.ts"
import {
  filePropertiesAt,
  uncommittedFiledAt,
} from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import {
  claimsOf,
  sidecarsOver,
} from "akasha/pages/indexes/path-claiming/path-claiming.module.code.ts"
import { valueByPath } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

export type PageOf = (at: string) => Value | null

export type BesideOf = (value: Value, at: string) => readonly string[]

export function takenIn(changes: readonly FileChange[]): readonly string[] {
  const gone: string[] = []
  for (const one of changes) if (one.kind === "remove") gone.push(one.path)
  return gone
}

export function namedIn(changes: readonly FileChange[]): ReadonlySet<string> {
  return new Set(changes.flatMap(pathsOf))
}

export function besideIn(root: string): BesideOf {
  const fileProperties = filePropertiesAt(root)
  const sidecars = sidecarsOver(root, [])
  const withheld = uncommittedFiledAt(root)
  return (value, at) =>
    claimsOf(value, at, root, fileProperties, sidecars, withheld, (one) =>
      existsSync(join(root, one))
    )
}

export function pageIn(root: string): PageOf {
  return (at) => {
    try {
      return valueByPath(root, at)
    } catch {
      return null
    }
  }
}

export function sweptWith(
  changes: readonly FileChange[],
  pageOf: PageOf,
  besideOf: () => BesideOf
): readonly FileChange[] {
  const pages: (readonly [string, Value])[] = []
  for (const at of takenIn(changes)) {
    const value = pageOf(at)
    if (value !== null) pages.push([at, value])
  }
  if (pages.length === 0) return []
  const named = namedIn(changes)
  const beside = besideOf()
  const seen = new Set<string>()
  const found: FileChange[] = []
  for (const [at, value] of pages) {
    for (const one of beside(value, at)) {
      if (one === at || named.has(one) || seen.has(one) || !uncommittedHeld(one)) continue
      seen.add(one)
      found.push({ kind: "remove", path: one })
    }
  }
  return found
}

export function sweptOff(root: string, changes: readonly FileChange[]): readonly FileChange[] {
  return sweptWith(changes, pageIn(root), () => besideIn(root))
}
