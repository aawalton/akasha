import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const badgeLayoutContext = {
  id: "01a05b55-a539-7f95-a30c-8b90c271e72d",
  type: "page-type/module",
  slug: "badge-layout-context",
  definition: "the layout a badge takes from the badges it sits among",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A layout asking for bare badges has every uncolored badge drawn as plain text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A badge whose color names a category keeps its pill in a bare layout.",
    },
  ],
} as const satisfies Module
