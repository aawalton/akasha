import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.ts"
import type { Antiquities } from "./properties/antiquities.page-property-entry.ts"
import type { EsoAntiquityCategoryId } from "./properties/eso-antiquity-category-id.number-property.ts"

export type TemperAntiquityCategory = TemperPursuitThing & {
  esoAntiquityCategoryId: EsoAntiquityCategoryId
  antiquities: Antiquities
}

export const temperAntiquityCategory = {
  id: "01a06166-503c-7000-a696-166a5a6ce1df",
  pageTypeSlug: "page-type",
  slug: "temper-antiquity-category",
  definition: "a grouping the game files antiquity lore under",
  pluralSlug: "temper-antiquity-categories",
  extendsSlug: "page-type/temper-pursuit-thing",
  partSlugs: [
    "number-property/eso-antiquity-category-id",
    "number-property/eso-antiquity-id",
    "number-property/eso-antiquity-set-id",
    "number-property/total-lore-entries",
    "page-property-entry/antiquities",
    "text-property/antiquity-name",
  ],
  properties: [
    { pagePropertySlug: "eso-antiquity-category-id", required: true, many: false },
    { pagePropertySlug: "antiquities", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A category is numbered in a key space of its own rather than by zone.",
    },
  ],
} as const satisfies PageType
