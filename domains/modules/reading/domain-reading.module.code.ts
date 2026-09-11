import {
  everyOfType,
  everyPath,
  readingIn,
} from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { kindsUnder } from "akasha/pages/types/descent/page-type-descent.module.code.ts"
import { valueAt } from "akasha/pages/value/page-value.module.code.ts"
import { textAt, type Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const DOMAIN = "domain"

export interface DomainRead {
  readonly relPath: string
  readonly slug: string
  readonly address: string
}

function heldIn(root: string): readonly DomainRead[] {
  const found: DomainRead[] = []
  for (const kind of kindsUnder(DOMAIN, readingIn(root), (path) => valueAt(path, root))) {
    for (const page of everyOfType(root, kind)) {
      let value: Value | null
      try {
        value = valueAt(page.path, root)
      } catch {
        continue
      }
      if (value === null) continue
      const slug = textAt(value, "slug")
      const pageTypeSlug = textAt(value, "type") ?? textAt(value, "pageTypeSlug")
      if (slug === null || pageTypeSlug === null) continue
      found.push({ relPath: page.path, slug, address: `${pageTypeSlug}/${slug}` })
    }
  }
  return found
}

const byRoot = new Map<string, readonly DomainRead[]>()

export function domainsRead(root: string): readonly DomainRead[] {
  const done = byRoot.get(root)
  if (done !== undefined) return done
  everyPath(root)
  const read = heldIn(root)
  byRoot.set(root, read)
  return read
}
