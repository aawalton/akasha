import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const pageCollectionContent = {
  id: "01a0625a-e4aa-7edf-a962-1513ae4bfd35",
  type: "module",
  slug: "page-collection-content",
  definition: "the body of a page whose page type is shown as a collection",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What a caller hands in is drawn between the header and the child collection.",
    },
    {
      invariantKind: "departure",
      statement: "A caller handing nothing in draws the header and the child collection alone.",
    },
  ],
} as const satisfies Module
