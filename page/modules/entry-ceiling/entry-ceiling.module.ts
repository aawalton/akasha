import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const entryCeiling = {
  id: "01a0680c-5278-7c36-a60c-23134f2fdb94",
  type: "page-type/module",
  slug: "entry-ceiling",
  definition: "the most bytes a file beside a page holds",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The ceiling is eight mebibytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One number is the ceiling a check enforces and the ceiling a writer rolls at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A writer opens another part rather than letting a file pass the ceiling.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file of entries and a file of records are held to the same ceiling.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says which files the ceiling reaches.",
    },
  ],
} as const satisfies Module
