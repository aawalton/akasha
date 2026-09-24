import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const characterSlug = {
  id: "01a063ce-6216-7006-8542-b3d67f43dc56",
  type: "page-type/text-property",
  slug: "character-slug",
  propertySlug: "character",
  definition: "the character a reading reaches",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A reading names a character the world holds no page for.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "This property is a relation to a character.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
