import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageTypeRenaming = {
  id: "01a091ff-4562-7ba7-9e1c-a4c636eda0b3",
  type: "page-type/module",
  slug: "page-type-renaming",
  definition:
    "where every file a page type and its pages hold lands once that page type is renamed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page of the renamed type takes the new slug where the old slug named its type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type's own file takes the new slug where the old slug opened its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file a page claims is carried with that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file naming the old slug nowhere is refused rather than left behind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file landing where a body already sits is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages are read from the index once rather than once for each page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The key a page states its type under is restated as text rather than through a parse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug is written into that key as the source spells a string rather than bare.",
    },

    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says what follows a file to where that file landed.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a change.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk.",
    },
  ],
} as const satisfies Module
