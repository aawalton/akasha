import {
  type Listed,
  listedAt,
  readingIn,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  narrows,
  type Test,
  unrun,
} from "akasha/page/service/modules/where-testing/where-testing.module.code.ts"

export type Where = Readonly<Record<string, Test>>

export type Narrowed = {
  readonly where: Where
  readonly met: Set<string>
}

export function whereIn(held: unknown): Where | undefined | null {
  if (held === undefined) return undefined
  if (held === null || typeof held !== "object" || Array.isArray(held)) return null
  const where = held as Where
  return unrun(where) === null ? where : null
}

function valueAt(reading: Reading, path: string): Value | null {
  try {
    return valueByPath(reading, path)
  } catch {
    return null
  }
}

export function narrowedOver(reading: Reading, pages: readonly Listed[], where: Where): Narrowed {
  const met = new Set<string>()
  for (const one of pages) {
    const value = valueAt(reading, one.path)
    const slug = partedIn(one.path)?.slug
    if (value !== null && slug !== undefined && narrows(value, where)) met.add(slug)
  }
  return { where, met }
}

export function within(narrowed: Narrowed, slug: string, valued: () => Value | null): boolean {
  const value = valued()
  const now = value !== null && narrows(value, narrowed.where)
  const was = narrowed.met.has(slug)
  if (now) narrowed.met.add(slug)
  else narrowed.met.delete(slug)
  return now || was
}

export function valuedOnce(root: string, pageTypeSlug: string, slug?: string): () => Value | null {
  let held: { readonly value: Value | null } | null = null
  return () => {
    if (held !== null) return held.value
    let value: Value | null = null
    if (slug !== undefined) {
      try {
        const reading = readingIn(root)
        const listed = listedAt(reading, pageTypeSlug, slug)[0]
        if (listed !== undefined) value = valueAt(reading, listed.path)
      } catch {}
    }
    held = { value }
    return value
  }
}
