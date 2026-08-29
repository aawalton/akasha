import type { Module } from "../../code-system/module/module.page-type.ts"

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
      statement:
        "This is the way back from `page-export-name`: a key written in camel and the kebab slug it is filed under name one another.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here reads a page or the disk. A key has a slug whether or not a property of that slug stands.",
    },
  ],
} as const satisfies Module
