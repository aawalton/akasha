import { type Value, valueAt } from "../../indexes/index-entries/index-entries.module.code.ts"
import { everyOfType } from "../../indexes/index-reading/index-reading.module.code.ts"
import type { Reading } from "../../indexes/index-surface/index-surface.module.code.ts"

const PAGE_TYPE = "page-type"

const EXTENDS = "extendsSlug"

const SLUG = "slug"

function slugOf(address: string): string {
  const at = address.indexOf("/")
  return at === -1 ? address : address.slice(at + 1)
}

function saidIn(value: Value | null, key: string): string | null {
  if (value === null) return null
  const said = value[key]
  return typeof said === "string" && said !== "" ? said : null
}

export function standingAbove(
  root: string,
  given: string | Reading = root,
  pageOf: (path: string) => Value | null = (path) => valueAt(path, root)
): ReadonlyMap<string, string> {
  const above = new Map<string, string>()
  for (const one of everyOfType(given, PAGE_TYPE)) {
    const value = pageOf(one.path)
    const slug = saidIn(value, SLUG)
    const said = saidIn(value, EXTENDS)
    if (slug !== null && said !== null) above.set(slug, slugOf(said))
  }
  return above
}

export function kindsUnder(
  root: string,
  slug: string,
  given: string | Reading = root,
  pageOf: (path: string) => Value | null = (path) => valueAt(path, root)
): ReadonlySet<string> {
  const above = standingAbove(root, given, pageOf)
  const under = new Set<string>([slug])
  for (;;) {
    let grew = false
    for (const [held, parent] of above) {
      if (!under.has(held) && under.has(parent)) {
        under.add(held)
        grew = true
      }
    }
    if (!grew) return under
  }
}
