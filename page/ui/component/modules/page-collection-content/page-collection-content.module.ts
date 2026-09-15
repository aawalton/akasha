import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageCollectionContent = {
  id: "01a0625a-e4aa-7edf-a962-1513ae4bfd35",
  type: "page-type/module",
  slug: "page-collection-content",
  definition: "the body of a page whose page type is shown as a collection",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a caller hands in is drawn between the header and the child collection.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller handing nothing in draws the header and the child collection alone.",
    },
  ],
} as const satisfies Module
