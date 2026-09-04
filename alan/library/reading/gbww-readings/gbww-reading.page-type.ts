import type { PageType } from "@akasha/pages-system/page-type"
import type { Collection } from "../../../../collection-system/collections/collection.page-type.ts"
import type { Title } from "../../../../pages/pages/properties/title.text-property.ts"
import type { GbwwEditionMarker } from "./properties/gbww-edition-marker.select-property.ts"
import type { GbwwPlanKey } from "./properties/gbww-plan-key.text-property.ts"
import type { GbwwPlanYear } from "./properties/gbww-plan-year.number-property.ts"
import type { GbwwReadingNumber } from "./properties/gbww-reading-number.number-property.ts"
import type { GbwwSection } from "./properties/gbww-section.text-property.ts"
import type { GbwwStorySlug } from "./properties/gbww-story-slug.relation-property.ts"
import type { GbwwWork } from "./properties/gbww-work.text-property.ts"

export type GbwwReading = Collection & {
  title: Title
  work: GbwwWork
  section: GbwwSection
  planKey: GbwwPlanKey
  planYear: GbwwPlanYear
  readingNumber: GbwwReadingNumber
  editionMarker: GbwwEditionMarker
  storySlug?: GbwwStorySlug
}

export const gbwwReading = {
  id: "01a0659f-93da-7019-b3d4-198e7acfbd4c",
  pageTypeSlug: "page-type",
  slug: "gbww-reading",
  definition: "one reading on the Great Books of the Western World ten-year plan",
  pluralSlug: "gbww-readings",
  extendsSlug: "page-type/collection",
  partSlugs: [
    "number-property/gbww-plan-year",
    "number-property/gbww-reading-number",
    "relation-property/gbww-story-slug",
    "select-property/gbww-edition-marker",
    "text-property/gbww-plan-key",
    "text-property/gbww-section",
    "text-property/gbww-work",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "collection-author", required: true, many: false },
    { pagePropertySlug: "gbww-work", required: true, many: false },
    { pagePropertySlug: "gbww-section", required: true, many: false },
    { pagePropertySlug: "gbww-plan-key", required: true, many: false },
    { pagePropertySlug: "gbww-plan-year", required: true, many: false },
    { pagePropertySlug: "gbww-reading-number", required: true, many: false },
    { pagePropertySlug: "gbww-edition-marker", required: true, many: false },
    { pagePropertySlug: "gbww-story-slug", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading names the work read and how much of that work is read.",
    },
    {
      invariantKind: "departure",
      statement: "A reading stands where the plan puts the reading.",
    },
    {
      invariantKind: "departure",
      statement: "A work read twice on the plan is two readings.",
    },
    {
      invariantKind: "absence",
      statement: "A reading is no record of a day Alan read.",
    },
  ],
} as const satisfies PageType
