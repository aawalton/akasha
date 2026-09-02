import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperPursuitThing } from "../temper-pursuit-things/temper-pursuit-thing.page-type.ts"
import type { Traits } from "./properties/traits.page-property-entry.ts"

export type TemperResearchLine = TemperPursuitThing & {
  traits: Traits
}

export const temperResearchLine = {
  id: "01a0616b-2cdf-7005-a903-e1d072da4881",
  pageTypeSlug: "page-type",
  slug: "temper-research-line",
  definition: "one shape of item a player researches traits on",
  pluralSlug: "temper-research-lines",
  extendsSlug: "page-type/temper-pursuit-thing",
  partSlugs: [
    "number-property/trait-index",
    "page-property-entry/traits",
    "text-property/trait-name",
  ],
  properties: [
    { pagePropertySlug: "parent", required: true, many: false },
    { pagePropertySlug: "display-order", required: true, many: false },
    { pagePropertySlug: "traits", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A research line hangs beneath the craft type the line is researched under.",
    },
  ],
} as const satisfies PageType
