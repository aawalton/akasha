import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersClassMastery = {
  id: "01a15a01-5df4-7a2f-8208-93c6be387fe3",
  type: "page-type/module",
  slug: "characters-class-mastery",
  definition: "every class mastery skill line and each passive on it, as the game gives them",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A class mastery line is a class skill line the game flags as class mastery.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is given by its id, its name and the class it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each passive on a line is given by its ability id, its name and its text, bought or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each passive says whether the character has bought it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passive's text plans a case and is never a verified case.",
    },
  ],
  createdAt: "2026-10-20T15:50:01.460Z",
  updatedAt: "2026-10-21T13:40:26.889Z",
} as const satisfies Module
