import {
  idsNaming,
  listedAt,
  slugsOfType,
  typeSlugById,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

const PAGE = "page"

const PAGE_TYPE = "page-type"

const EXTENDS_TYPE = "extends-type"

function idsCarrying(given: string | Reading, slug: string): readonly string[] {
  return listedAt(given, PAGE_TYPE, slug).map((one) => one.id)
}

export function kindsUnder(slug: string, given: string | Reading): ReadonlySet<string> {
  if (slug === PAGE) return new Set(slugsOfType(given, PAGE_TYPE))
  const under = new Set<string>([slug])
  const walked = new Set<string>()
  const waiting: string[] = [slug]
  for (let one = waiting.pop(); one !== undefined; one = waiting.pop()) {
    for (const id of idsCarrying(given, one)) {
      if (walked.has(id)) continue
      walked.add(id)
      for (const below of idsNaming(given, id, EXTENDS_TYPE)) {
        const said = typeSlugById(given, below)
        if (said === null || under.has(said)) continue
        under.add(said)
        waiting.push(said)
      }
    }
  }
  return under
}
