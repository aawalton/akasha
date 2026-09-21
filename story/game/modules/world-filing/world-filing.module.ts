import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const worldFiling = {
  id: "01a0c657-25a7-7aa9-bb40-aa6d97d1e08f",
  type: "page-type/module",
  slug: "world-filing",
  definition: "the pages an old engine's places become, with what each place sets in the way",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A room is a place inside the place it was a room of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A room is as deep into the game as the place it is inside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The light and the water in a place come off as conditions.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every way out of a place comes off as one list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The one an encounter sets in the way is a page of its own, named by it.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The gates an encounter reads a strike through come off its prose.",
    },
  ],
} as const satisfies Module
