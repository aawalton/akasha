import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { ExclusionReason } from "./properties/exclusion-reason.text-property.ts"
import type { ShortList } from "./properties/short-list.boolean-property.ts"
import type { Sources } from "./properties/sources.text-property.ts"

export type Car = Page & {
  title: Title
  shortList?: ShortList
  sources?: Sources
  exclusionReason?: ExclusionReason
}

export const car = {
  id: "01a065a0-0000-7000-8000-000000000401",
  pageTypeSlug: "page-type",
  slug: "car",
  definition: "one level of a maker's catalogue, as Alan weighed buying from it",
  pluralSlug: "cars",
  extendsSlug: "page-type/page",
  partSlugs: [
    "boolean-property/short-list",
    "text-property/exclusion-reason",
    "text-property/sources",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "short-list", required: false, many: false },
    { pagePropertySlug: "sources", required: false, many: false },
    { pagePropertySlug: "exclusion-reason", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every page type naming a level of a maker's catalogue builds on this one.",
    },
    {
      invariantKind: "departure",
      statement: "A level names the level above it and never the levels below.",
    },
    {
      invariantKind: "absence",
      statement: "No page is a car itself.",
    },
  ],
} as const satisfies PageType
