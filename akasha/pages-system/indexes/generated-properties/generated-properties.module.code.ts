import { exportedAs } from "@akasha/pages-system/page-export-name"
import { slugOf, textAt } from "@akasha/pages-system/page-value"
import type { Shadow } from "@akasha/pages-system/shadow"

const GENERATOR = "generator"

const GENERATOR_KIND = "generator-kind"

const AFTER_CHECKS = "afterChecks"

export type Generated = {
  readonly key: string
  readonly kind: string
  readonly afterChecks: boolean
}

function waitsFor(shadow: Shadow, kind: string): boolean {
  for (const one of shadow.index.listedAt(GENERATOR_KIND, kind)) {
    const value = shadow.pageOf(one.path)
    if (value !== null) return value[AFTER_CHECKS] === true
  }
  throw new Error(
    `\`${kind}\` is named as a generator, and no \`${GENERATOR_KIND}\` carries that slug, so when it works its value out could not be answered`
  )
}

export function generatedProperties(shadow: Shadow): ReadonlyMap<string, Generated> {
  const found = new Map<string, Generated>()
  for (const held of shadow.index.schemaAt().values()) {
    for (const one of shadow.index.listedAt(held.pageTypeSlug, held.slug)) {
      const value = shadow.pageOf(one.path)
      if (value === null) continue
      const said = textAt(value, GENERATOR)
      if (said === null) continue
      const kind = slugOf(said)
      found.set(held.slug, {
        key: exportedAs(held.propertySlug),
        kind,
        afterChecks: waitsFor(shadow, kind),
      })
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
