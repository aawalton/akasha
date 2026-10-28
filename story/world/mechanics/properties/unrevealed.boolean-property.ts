import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const unrevealed = {
  id: "01a0f133-5906-7039-b410-e2fe14be3d2b",
  type: "page-type/boolean-property",
  slug: "unrevealed",
  propertySlug: "unrevealed",
  definition: "whether a mechanic held by a player's character is still unknown to the player",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page the story has not yet shown the player states true.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page the player has been shown states nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No play screen shows a page stating true.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill stating true is a skill still locked.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-30T07:24:29.318Z",
  updatedAt: "2026-10-28T00:44:44.199Z",
} as const satisfies BooleanProperty
