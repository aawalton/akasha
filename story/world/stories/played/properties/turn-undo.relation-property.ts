import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const turnUndo = {
  id: "01a0f1c7-4de9-7d53-acd4-24af9e2aa93c",
  type: "page-type/relation-property",
  slug: "turn-undo",
  propertySlug: "turn-undo",
  definition: "the latest turn of a story played that its player asked to have undone",
  targetPageType: "page-type/story-turn-played",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story holds one turn asked to be undone at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn before player is cancelled, and a turn at player is taken back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ask is taken off once the turn is undone or the undoing is refused.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
