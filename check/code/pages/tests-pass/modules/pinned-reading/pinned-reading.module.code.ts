import type {
  Bodies,
  Body,
} from "akasha/code/running/modules/test-overlay/test-overlay.module.code.ts"
import { bodyAt } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { closureOf } from "akasha/graph/predicate/modules/closure/graph-predicate-closure.module.code.ts"
import { imports } from "akasha/graph/predicate/pages/imports/imports.graph-predicate.ts"
import { answeringOver } from "akasha/page/index/modules/answering/index-answering.module.code.ts"
import { valueByPath } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

export function pinnedBodies(
  root: string,
  base: string,
  pages: Reading,
  named: readonly string[],
  bodies: Bodies
): Bodies {
  const decoding = new TextDecoder()
  const held = new Map<string, Uint8Array | null>()
  const raw = (path: string): Uint8Array | null => {
    if (!held.has(path)) held.set(path, bodyAt(root, base, path))
    return held.get(path) ?? null
  }
  const text = (path: string): string | null => {
    const one = raw(path)
    return one === null ? null : decoding.decode(one)
  }
  const index = answeringOver(pages, (path) => valueByPath(pages, path))
  const through = (path: string): boolean => raw(path) !== null
  const reached = closureOf(imports, named, { index, bodyAt: text, through })
  const found: Record<string, Body> = { ...bodies }
  for (const one of named) {
    if (!Object.hasOwn(found, one)) found[one] = raw(one)
  }
  for (const one of reached) {
    if (Object.hasOwn(found, one)) continue
    const body = raw(one)
    if (body !== null) found[one] = body
  }
  return found
}
