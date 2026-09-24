import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const loreBarring = {
  id: "01a0d488-6a42-730b-821a-7794efb3ae3a",
  type: "page-type/module",
  slug: "lore-barring",
  definition: "the files a read keeps from a game master's seat as the world builder's lore",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A read naming a file the world builder holds is refused whole for a game master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refused read records nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A read naming no file leaves out what the world builder holds and reads the rest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read by any other seat is answered as though this module were not there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names no file it keeps back.",
    },
  ],
} as const satisfies Module
