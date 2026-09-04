import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../../temper/temper-things/properties/title.text-property.ts"
import type { EsoDay as TrackedEsoDay } from "./properties/eso-day.text-property.ts"
import type { HealthSamples } from "./properties/health-samples.page-property-entry.ts"
import type { Listens } from "./properties/listens.page-property-entry.ts"
import type { SurplusTierSaid } from "./properties/surplus-tier-said.text-property.ts"

export type EsoDay = Page & {
  title: Title
  esoDay: TrackedEsoDay
  surplusTierSaid?: SurplusTierSaid
  healthSamples?: HealthSamples
  listens?: Listens
}

export const esoDay = {
  id: "01a060fb-040c-7d23-bdf5-9d57cdcc057d",
  pageTypeSlug: "page-type",
  slug: "eso-day",
  definition: "what was measured about one of Alan's ESO days",
  pluralSlug: "eso-days",
  extendsSlug: "page-type/page",
  partSlugs: [
    "instant-property/arrived-at",
    "instant-property/ended-at",
    "instant-property/started-at",
    "number-property/value",
    "page-property-entry/health-samples",
    "page-property-entry/listens",
    "text-property/eso-day",
    "text-property/source-name",
    "text-property/surplus-tier-said",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "eso-day", required: true, many: false },
    { pagePropertySlug: "surplus-tier-said", required: false, many: false },
    { pagePropertySlug: "health-samples", required: false, many: false },
    { pagePropertySlug: "listens", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One ESO day is one page.",
    },
    {
      invariantKind: "departure",
      statement: "Everything measured against the ESO boundary is on that day's page.",
    },
    {
      invariantKind: "departure",
      statement: "An ESO day is slugged `eso-day-` before the day it is of.",
    },
    {
      invariantKind: "departure",
      statement: "No ESO day is slugged by its date alone.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is filed under the ESO day the reading's stretch began in.",
    },
    {
      invariantKind: "departure",
      statement: "A reading is an entry beside the day rather than a page.",
    },
    {
      invariantKind: "departure",
      statement: "Every ESO day Alan tracked is a page of this type.",
    },
    {
      invariantKind: "absence",
      statement: "No ESO day is kept in markdown.",
    },
    {
      invariantKind: "absence",
      statement: "No reading is kept in markdown.",
    },
  ],
} as const satisfies PageType
