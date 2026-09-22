import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTaskAutoComplete = {
  id: "01a06306-f94f-700b-8c39-f425d7ea4a81",
  type: "page-type/module",
  slug: "characters-task-auto-complete",
  definition: "a task marked complete from the progress already read into the saved table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A task naming no completion card is marked by hand alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mark made before the day's reset counts as no mark.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A task scoped to every character is marked once every character has its own mark.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A character's first reading of a task on a day opens a snapshot and marks nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading above the one a snapshot opened on is written onto that snapshot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A daily writ rising is written onto its snapshot and marks nothing.",
    },
  ],
} as const satisfies Module
