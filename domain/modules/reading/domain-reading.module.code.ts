import {
  everyOfType,
  readingIn,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { valueAt } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  slugAt,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { kindsUnder } from "akasha/page/type/modules/descent/page-type-descent.module.code.ts"

const DOMAIN = "domain"

interface DomainRead {
  readonly relPath: string
  readonly slug: string
  readonly address: string
}

function heldIn(root: string): readonly DomainRead[] {
  const found: DomainRead[] = []
  for (const kind of kindsUnder(DOMAIN, readingIn(root))) {
    for (const page of everyOfType(root, kind)) {
      let value: Value | null
      try {
        value = valueAt(page.path, root)
      } catch {
        continue
      }
      if (value === null) continue
      const slug = textAt(value, "slug")
      const pageTypeSlug = slugAt(value, "type")
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
  const read = heldIn(root)
  byRoot.set(root, read)
  return read
}
