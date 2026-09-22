import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const validSlots = {
  id: "01a05fcc-41f4-739e-a73e-ae1c6505faab",
  type: "page-type/text-property",
  slug: "valid-slots",
  propertySlug: "valid-slots",
  definition: "the slots a piece of this kind fits",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    { decisionKind: "decision-kind/gap", statement: "This property is a relation to a slot." },
    {
      decisionKind: "decision-kind/departure",
      statement: "One list has every slot a kind fits.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
