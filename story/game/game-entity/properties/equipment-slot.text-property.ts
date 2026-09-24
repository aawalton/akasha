import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const equipmentSlot = {
  id: "01a0c63a-0f6e-740e-8eb1-719fb7926587",
  type: "page-type/text-property",
  slug: "equipment-slot",
  propertySlug: "slot",
  definition: "where on an entity a thing is worn or held",
  maxLength: 40,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing filling no slot is carried rather than worn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The slots a game has are its own words rather than one list.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
