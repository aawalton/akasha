import type { List } from "@akasha/pages/page-property"
import type { StandardAgentEnglishProperty } from "../standard-agent-english/properties/standard-agent-english-property.page-type.ts"

export type Aid = string
export type Aids = List<Aid>

export const aids = {
  id: "01a049c9-3a2c-7044-a7e7-234356b9df18",
  pageTypeSlug: "standard-agent-english-property",
  slug: "aids",
  propertySlug: "aids",
  definition: "the rulings on acts a reader is about to take, each for or against",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An aid runs to the length an act or a warrant runs to.",
    },
  ],
} as const satisfies StandardAgentEnglishProperty
