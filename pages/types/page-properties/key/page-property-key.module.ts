import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const pagePropertyKey = {
  id: "01a04e57-b7b0-7401-852a-4c0be30ace24",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-property-key",
  definition: "the slug a page property's key answers to",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A key becomes a slug by lowering each capital and setting a `-` before that capital.",
    },
    {
      invariantKind: "departure",
      statement: "This module is the way back from `page-export-name`.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page or the disk.",
    },
    {
      invariantKind: "constraint",
      statement: "Nothing is imported here, so dash-each-capital spells this rule a second time.",
    },
  ],
} as const satisfies Module
