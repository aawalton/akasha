import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const coverReroll = {
  id: "01a0e84e-3f8e-74cf-b543-8711abba573e",
  type: "page-type/relation-property",
  slug: "cover-reroll",
  propertySlug: "cover-reroll",
  definition: "the picture of a story that its reader asked to have drawn again",
  targetPageType: "page-type/image",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story holds one picture asked to be drawn again at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story played and a story written each hold this ask.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ask is taken off once the cover is drawn again or the drawing is refused.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
