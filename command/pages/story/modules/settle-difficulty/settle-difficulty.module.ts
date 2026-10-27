import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const settleDifficulty = {
  id: "01a17ee1-3c44-7068-85bb-57dfe660e7ff",
  type: "page-type/module",
  slug: "settle-difficulty",
  definition: "how far a story's difficulty level moves the roll of a check it moves",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A check stating `difficultyMoved` has the level's odds modifier added to its roll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The modifier moves the roll's total, and a natural twenty or one stays as rolled.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story naming no level is read at the level story-played declares by default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The level is read when the roll is settled, so a change holds from the next roll.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A moved roll's line states the level and what it added.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story naming a level that is no page here is refused and appends nothing.",
    },
  ],
  createdAt: "2026-10-27T19:40:52.676Z",
  updatedAt: "2026-10-27T19:40:52.676Z",
} as const satisfies Module
