import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const sessionAnchor = {
  id: "01a0685e-89d5-7b3b-a4aa-12eca2cee68b",
  pageTypeSlug: "module",
  slug: "session-anchor",
  definition: "which movement a session is built around, and the order the rest are ranked in",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The anchor is the movement of that pattern logged most, not the one scored best.",
    },
    {
      invariantKind: "departure",
      statement: "A pattern with nothing logged introduces its best-scoring movement.",
    },
    {
      invariantKind: "departure",
      statement: "An anchor that has stalled is held and flagged rather than swapped out.",
    },
    {
      invariantKind: "departure",
      statement: "A rotation turns the top of the ranking by the day so the same day differs.",
    },
    {
      invariantKind: "departure",
      statement: "The rotation reorders no movement outside the window it turns.",
    },
    {
      invariantKind: "departure",
      statement: "Every pick states in words why it was picked.",
    },
  ],
} as const satisfies Module
