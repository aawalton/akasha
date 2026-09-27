import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const craftKnowledge = {
  id: "01a061c7-e852-7375-898b-883039b51d97",
  type: "page-type/module",
  slug: "craft-knowledge",
  definition: "what a character knows, asked of the knowledge modules beside this one",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Another character's motif knowledge is her captured lore books, as the rules read it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The current character's motif knowledge is asked of the game.",
    },
  ],
} as const satisfies Module
