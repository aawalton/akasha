import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const collectionChildren = {
  id: "01a18803-cea5-705d-b15d-36afd298a622",
  type: "page-type/module",
  slug: "collection-children",
  definition: "how code shows the pages under a page in the view of its type",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages drawn are the pages naming this page and no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page shows its title and the pages under it rather than its properties.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages are drawn by the view the nearest type in the page's own chain embeds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page nothing names shows its properties rather than an empty view.",
    },
  ],
  createdAt: "2026-10-29T14:15:13.316Z",
  updatedAt: "2026-10-30T15:21:30.741Z",
} as const satisfies Module
