import { expect, test } from "bun:test"
import {
  pagesElsewhere,
  pagesStranded,
} from "akasha/page/index/modules/beside-turning/beside-turning.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

type Held = Record<string, unknown>

const aType = (slug: string, above: readonly string[], properties: readonly Held[]): Held => ({
  type: `${pageType.slug}/${pageType.slug}`,
  slug,
  extends: above,
  properties,
})

const BLAND = aType("bland", ["base"], [])

const TYPE_SLUGS = "page-type/page-type/slug"

const BLAND_SLUGS = "page-type/bland/slug"

const AT = `${BLAND_SLUGS}/one.jsonl`

const PAGE = "one.bland.ts"

const ID = "01a04bdd-0000-7000-8000-00000000000a"

const BODY = `export const it = ${JSON.stringify({ type: "page-type/bland", slug: "one" })} as const\n`

const READING: Reading = {
  holds: (at) => at === "",
  listing: (at) => {
    if (at === TYPE_SLUGS) return [{ name: "bland.jsonl", directory: false }]
    if (at === BLAND_SLUGS) return [{ name: "one.jsonl", directory: false }]
    return []
  },
  lines: (at) => (at === AT ? [JSON.stringify({ path: PAGE, id: ID })] : []),
  read: (at) => (at === PAGE ? BODY : null),
}

test("a page type the change leaves naming no page type strands the pages already of it", () => {
  const trial = aType("trial", ["base"], [])

  expect(pagesStranded(READING, [BLAND], [trial], new Set()).map((one) => one.path)).toEqual([
    "one.bland.ts",
  ])
  expect(pagesStranded(READING, [BLAND], [BLAND], new Set())).toEqual([])
  expect(pagesStranded(READING, [BLAND], [trial], new Set(["one.bland.ts"]))).toEqual([])
})

test("a file that is no page is not answered though the index names that file", () => {
  const turned = new Set(["id"])

  expect(pagesElsewhere(READING, turned, new Set()).map((one) => one.path)).toEqual([PAGE])
  expect(pagesElsewhere(READING, new Set(), new Set())).toEqual([])
  expect(pagesElsewhere(READING, turned, new Set([PAGE]))).toEqual([])
})
