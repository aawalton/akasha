import type { List } from "../../../pages-system/page-property/page-property.page-type.ts"
import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Aid = string
export type Aids = List<Aid>

export const aids = {
  id: "01a049c9-3a2c-7044-a7e7-234356b9df18",
  pageTypeSlug: "text-property",
  slug: "aids",
  propertySlug: "aids",
  definition: "the rulings on acts a reader is about to take, each for or against",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An aid runs to what an act or a warrant runs to.",
    },
  ],
} as const satisfies TextProperty
