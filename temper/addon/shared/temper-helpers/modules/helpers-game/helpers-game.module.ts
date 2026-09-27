import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const helpersGame = {
  id: "01a0617d-5451-7952-9d26-5748fb7a36ff",
  type: "page-type/module",
  slug: "helpers-game",
  definition: "what an add-on asks the game about a zone, a group, a string or a version",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An event name this code registers is unique to the bundle registering it.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game refuses a second registration under a name an event already holds.",
    },
  ],
} as const satisfies Module
