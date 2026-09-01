import type { Module } from "@akasha/code-system/module"

export const pagePropertyKey = {
  id: "01a04e57-b7b0-7401-852a-4c0be30ace24",
  pageTypeSlug: "module",
  slug: "page-property-key",
  definition: "the slug a page property's key answers to",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key becomes a slug by lowering each capital and setting a `-` before it.",
    },
    {
      invariantKind: "departure",
      statement: "This module is the way back from `page-export-name`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page or the disk.",
    },
  ],
} as const satisfies Module
