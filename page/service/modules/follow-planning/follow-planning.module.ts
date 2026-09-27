import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const followPlanning = {
  id: "01a0e1af-6634-7bb6-b3fe-3561cf6be4d6",
  type: "page-type/module",
  slug: "follow-planning",
  definition: "the folders and files heard for what every open stream follows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a page type carries is read from the file beside it, once in each plan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type with no such file beside it is taken to carry no computed property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages of a page type are listed off the index once in each plan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file a computed property keeps is heard once, for every page type carrying it.",
    },
  ],
} as const satisfies Module
