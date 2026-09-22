import type { OneOfProperty } from "akasha/page/one-of-property/one-of-property.page-type.types.ts"

export const validSlots = {
  id: "01a05fcc-41f4-739e-a73e-ae1c6505faab",
  type: "page-type/one-of-property",
  slug: "valid-slots",
  propertySlug: "valid-slots",
  definition: "the slots a piece of this kind fits",
  members: [
    "relation-property/armor-slot",
    "relation-property/weapon-slot",
    "relation-property/jewelry-slot",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot is a page of the kind of piece worn in that slot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind of armor piece fits a slot a weapon is held in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One list has every slot a kind fits.",
    },
  ],
  types: "ts",
} as const satisfies OneOfProperty
