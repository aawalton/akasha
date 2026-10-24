import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildShowNaming = {
  id: "01a159b7-e764-7aa4-8033-f3ef8bdcd33e",
  type: "page-type/module",
  slug: "build-show-naming",
  definition: "the build hash a word names, and where that hash was found",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A word is looked for as a build page, then a character, then a reading's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word that names none of those is taken as a hash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character names its live build, or its newest reading where it states none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build named through a reading carries that reading's stars and their points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading's id is named by its start, and a start fitting two readings is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the reading lines holding that start are read as readings.",
    },
  ],
  createdAt: "2026-10-20T14:29:46.979Z",
  updatedAt: "2026-10-24T20:00:36.318Z",
} as const satisfies Module
