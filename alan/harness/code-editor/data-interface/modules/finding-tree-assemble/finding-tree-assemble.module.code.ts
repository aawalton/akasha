import {
  domainsIn,
  type Hung,
  type HungTree,
  hungOnDomains,
} from "akasha/alan/harness/code-editor/data-interface/modules/domain-tree-hanging/domain-tree-hanging.module.code.ts"
import {
  readingIn,
  valuesOfType,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const FINDING = "finding"

const DOMAIN = "domain"

const CLAIM = "claim"

const KEYED = "finding/"

export type Found = {
  readonly slug: string
  readonly at: string
  readonly domain: string
  readonly said: string
}

export function findingsIn(given: string | Reading): readonly Found[] {
  const found: Found[] = []
  for (const one of valuesOfType(readingIn(given), FINDING)) {
    const parted = partedIn(one.path)
    const domain = textAt(one.value, DOMAIN)
    const said = textAt(one.value, CLAIM)
    if (parted === null || domain === null || said === null) continue
    found.push({ slug: parted.slug, at: one.path, domain, said })
  }
  return found
}

function bySlug(one: Found, two: Found): number {
  return one.slug < two.slug ? -1 : one.slug > two.slug ? 1 : 0
}

export function hungOf(found: readonly Found[]): readonly Hung[] {
  return [...found].sort(bySlug).map((one) => ({
    key: `${KEYED}${one.slug}`,
    label: one.said,
    at: one.at,
    domain: one.domain,
  }))
}

export function assembleFindingTree(given: string | Reading): HungTree {
  const reading = readingIn(given)
  return hungOnDomains(domainsIn(reading), hungOf(findingsIn(reading)))
}
