import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import { textAt } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const GENERATOR = "generator"

const GENERATOR_KIND = "generator-kind"

const AFTER_CHECKS = "afterChecks"

export type Generated = {
  readonly key: string
  readonly kind: string
  readonly afterChecks: boolean
}

export function generatedProperties(shadow: Shadow): ReadonlyMap<string, Generated> {
  const found = new Map<string, Generated>()
  for (const one of shadow.index.everyOfType(GENERATOR_KIND)) {
    const page = shadow.pageOf(one.path)
    if (page === null) continue
    const kind = textAt(page, "slug")
    if (kind === null) continue
    const afterChecks = page[AFTER_CHECKS] === true
    for (const naming of shadow.index.namersOf(one.id)) {
      if (naming.propertySlug !== GENERATOR) continue
      const value = shadow.pageOf(naming.path)
      if (value === null) continue
      const slug = textAt(value, "slug")
      const key = textAt(value, "propertySlug")
      if (slug === null || key === null) continue
      found.set(slug, { key: exportedAs(key), kind, afterChecks })
    }
  }
  return new Map([...found].sort((one, two) => (one[0] < two[0] ? -1 : one[0] > two[0] ? 1 : 0)))
}

export function waitingProperties(shadow: Shadow): ReadonlySet<string> {
  const found: string[] = []
  for (const [slug, held] of generatedProperties(shadow)) {
    if (held.afterChecks) found.push(slug)
  }
  return new Set(found)
}

export function waitingKeys(shadow: Shadow): ReadonlySet<string> {
  const found: string[] = []
  for (const held of generatedProperties(shadow).values()) {
    if (held.afterChecks) found.push(held.key)
  }
  return new Set(found)
}
