import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionSavedVariablesParser = {
  id: "01a060d7-c8cf-7aa1-a0b6-af0a0addf2ef",
  type: "page-type/module",
  slug: "completion-saved-variables-parser",
  definition: "the addon's saved variables file turned into records of what is complete",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The saved table is read as `TemperCharacters_SavedVariables` or as `Temper_SavedVariables`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Companions are read from `TemperCompanions_SavedVariables`, or else from the saved table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which companion a definition id names is asked of the caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion the caller cannot name is counted as skipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character that will not read is counted as skipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lua key written as a number is kept as text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Diagnostics come back alongside the records rather than reaching a log.",
    },
  ],
} as const satisfies Module
