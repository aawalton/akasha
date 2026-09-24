import { expect, test } from "bun:test"
import { A, B, C } from "akasha/page/index/modules/entries/index-entries.module.test-fixtures.ts"
import {
  filedByPageProperty,
  pagePropertyIn,
} from "akasha/page/index/page-property/index-page-property.index.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { page as pagePageType } from "akasha/page/page.page-type.ts"
import {
  identifyingFrom,
  sourceOver,
} from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const PAGE_TYPE: Value = {
  id: B,
  type: `${pageType.slug}/${pageType.slug}`,
  slug: "page",
  extends: [],
  properties: [{ pagePropertySlug: "slug", required: true, many: false }],
}

const SLUG_PROPERTY: Value = {
  id: C,
  type: `${pageType.slug}/text-property`,
  slug: "slug",
  propertySlug: "slug",
  unique: "page-type",
}

const SECTION_TYPE: Value = {
  id: A,
  type: `${pageType.slug}/${pageType.slug}`,
  slug: "section",
  extends: [`${pageType.slug}/${pagePageType.slug}`],
  properties: [
    {
      pagePropertySlug: "slug",
      required: true,
      many: false,
      unique: "page-property",
      uniqueProperty: "section-of-slug",
    },
    { pagePropertySlug: "section-of-slug", required: true, many: false },
  ],
}

const SECTION_OF: Value = {
  id: B,
  type: `${pageType.slug}/relation-property`,
  slug: "section-of-slug",
  propertySlug: "section-of-slug",
}

const SCOPING = identifyingFrom(sourceOver([SECTION_TYPE, PAGE_TYPE, SLUG_PROPERTY, SECTION_OF]))

const PRICING: Value = {
  id: A,
  type: "page-type/section",
  slug: "pricing",
  sectionOfSlug: "section/solar-power",
}

test("a declaration naming a scoping property carries the key that property is read by", () => {
  expect(SCOPING("section").get("slug")).toEqual({
    key: "slug",
    uniqueKind: "page-property",
    scopedBy: { key: "sectionOfSlug", pagePropertySlug: "section-of-slug" },
  })
})

test("a page unique among those carrying one value is filed under its type, that property and that value", () => {
  expect(filedByPageProperty(PRICING, SCOPING)).toEqual([
    {
      uniqueKind: "page-property",
      scope: "section/section-of-slug/solar-power",
      propertySlug: "slug",
      said: "pricing",
    },
  ])
})

test("a scoping value naming its page type is filed under the slug alone", () => {
  expect(pagePropertyIn(PRICING, "/repo/pricing.section.ts", "/repo", SCOPING)).toEqual([
    {
      at: "page-property/section/section-of-slug/solar-power/slug/pricing.jsonl",
      line: `{"path":"pricing.section.ts","id":"${A}"}`,
    },
  ])
})

test("a page carrying no value of the property scoping it is filed nowhere", () => {
  const bare: Value = { id: A, type: "page-type/section", slug: "pricing" }

  expect(filedByPageProperty(bare, SCOPING)).toEqual([])
  expect(pagePropertyIn(bare, "/repo/pricing.section.ts", "/repo", SCOPING)).toEqual([])
})

test("a page unique within its type alone is filed nowhere here", () => {
  const page: Value = { id: B, type: `${pageType.slug}/page`, slug: "held" }

  expect(pagePropertyIn(page, "/repo/held.page.ts", "/repo", SCOPING)).toEqual([])
})

test("a page type declaring this kind and naming no scoping property is a fault", () => {
  const unscoped = identifyingFrom(
    sourceOver([
      {
        id: A,
        type: `${pageType.slug}/${pageType.slug}`,
        slug: "section",
        extends: [],
        properties: [{ pagePropertySlug: "slug", required: true, many: false }],
      },
      {
        id: C,
        type: `${pageType.slug}/text-property`,
        slug: "slug",
        propertySlug: "slug",
        unique: "page-property",
      },
    ])
  )

  expect(() => filedByPageProperty(PRICING, unscoped)).toThrow(
    "`section` names no property a unique value of it is scoped by"
  )
})
