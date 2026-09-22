import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const errorsDescriptor = {
  id: "01a0608a-15b2-78e5-a967-45a0dec13df1",
  type: "page-type/module",
  slug: "errors-descriptor",
  definition: "the name, version and defaults error capture hands the game to save under",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The game saves the add-on under the name `TemperErrors_SavedVariables`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The defaults have an empty list of entries.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No load time is kept.",
    },
  ],
} as const satisfies Module
