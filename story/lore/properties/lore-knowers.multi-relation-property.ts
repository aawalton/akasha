import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const loreKnowers = {
  id: "01a0deeb-9c4e-7015-a498-0a4f0584de69",
  type: "page-type/multi-relation-property",
  slug: "lore-knowers",
  propertySlug: "knowers",
  definition: "the game master and the characters a fact is known to",
  targetPageType: "page-type/page",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The world builder knows every fact and is never listed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A player character represents the player who plays it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact gains knowers and never loses one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact a character knows is known to the game master too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The command telling a character a fact lists the game master in the same write.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
