import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatFightCapture = {
  id: "01a15431-dba4-7404-8716-014e9a410067",
  type: "page-type/module",
  slug: "combat-fight-capture",
  definition: "every fight the player fights, written whole with no Save pressed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every fight that ends, wherever it is fought, is written to saved variables with no Save pressed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where a fight was fought is stated on the fight rather than choosing which are kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fight in the Infinite Archive also states the stage, cycle and arc counted as it ended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fight keeps the summary the longest fight keeps, beside its whole log.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The log keeps every line the recorder logged but the frame rate and ping.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A line's fields are written as text joined by colons, and its time counts from the fight's start.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lines are joined by semicolons into strings of at most 1,900 characters.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game saves a string whole only up to about two thousand characters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The oldest fight goes once more than 400 are kept or their logs run over four million characters.",
    },
  ],
  createdAt: "2026-10-19T12:45:16.068Z",
  updatedAt: "2026-10-19T12:45:16.068Z",
} as const satisfies Module
