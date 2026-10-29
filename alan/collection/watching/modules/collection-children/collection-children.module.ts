import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const collectionChildren = {
  id: "01a18803-cea5-705d-b15d-36afd298a622",
  type: "page-type/module",
  slug: "collection-children",
  definition: "the pages naming one page, drawn through the view that page's type embeds",
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
      statement: "The pages are drawn by the view the page's own type embeds.",
    },
  ],
  createdAt: "2026-10-29T14:15:13.316Z",
  updatedAt: "2026-10-29T14:15:13.316Z",
} as const satisfies Module
