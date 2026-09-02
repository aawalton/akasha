import type { PageType } from "@akasha/pages-system/page-type"
import type { CapturedAt } from "../../temper-catalog/temper-world/properties/captured-at.instant-property.ts"
import type { TemperThing } from "../../temper-things/temper-thing.page-type.ts"
import type { TotalValue } from "./properties/total-value.number-property.ts"

export type TemperHoldingsThing = TemperThing & {
  capturedAt?: CapturedAt
  totalValue?: TotalValue
}

export const temperHoldingsThing = {
  id: "01a05fcb-fd2b-77f2-923a-cb5f59585696",
  pageTypeSlug: "page-type",
  slug: "temper-holdings-thing",
  definition: "a reading of what an account holds",
  pluralSlug: "temper-holdings-things",
  extendsSlug: "page-type/temper-thing",
  partSlugs: ["instant-property/captured-at", "number-property/total-value"],
  properties: [
    { pagePropertySlug: "captured-at", required: false, many: false },
    { pagePropertySlug: "total-value", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading states what an account was worth at one moment.",
    },
  ],
} as const satisfies PageType
