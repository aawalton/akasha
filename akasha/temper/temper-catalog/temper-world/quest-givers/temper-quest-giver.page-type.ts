import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperCatalogThing } from "../../temper-catalog-things/temper-catalog-thing.page-type.ts"
import type { CycleLength } from "../properties/cycle-length.number-property.ts"
import type { Epoch } from "../properties/epoch.text-property.ts"

export type TemperQuestGiver = TemperCatalogThing & {
  cycleLength: CycleLength
  epoch: Epoch
}

export const temperQuestGiver = {
  id: "01a05fc4-7a94-7f79-9230-59fb6df46445",
  pageTypeSlug: "page-type",
  slug: "temper-quest-giver",
  definition: "a character handing out the pledges of a day",
  pluralSlug: "temper-quest-givers",
  extendsSlug: "page-type/temper-catalog-thing",
  partSlugs: ["number-property/cycle-length", "text-property/epoch"],
  properties: [
    { pagePropertySlug: "cycle-length", required: true, many: false },
    { pagePropertySlug: "epoch", required: true, many: false },
  ],
} as const satisfies PageType
