import { everyOfType, everyPath, readingIn } from "@akasha/pages-system/index-reading"
import { kindsUnder } from "@akasha/pages-system/page-type-descent"
import { type Value, valueAt } from "@akasha/pages-system/page-value"

const DOMAIN = "domain"

export interface DomainRead {
  readonly relPath: string
  readonly slug: string
  readonly address: string
}

function textIn(value: Value, key: string): string | null {
  const held = value[key]
  return typeof held === "string" ? held : null
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
      const slug = textIn(value, "slug")
      const pageTypeSlug = textIn(value, "pageTypeSlug")
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
