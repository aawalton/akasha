import type { Module } from "../../../code-system/module/module.page-type.ts"

export const pageValue = {
  id: "01a0592a-2e05-7e6a-941f-9dfd06790615",
  pageTypeSlug: "module",
  slug: "page-value",
  definition: "the value a page's body declares, and what one of its keys holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page's body can be loaded after the file it came from is gone.",
    },
    {
      invariantKind: "departure",
      statement: "The value a body declares is the first object it exports.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not load answers with why rather than with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A key is read as the type it is asked for or as nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A value naming a page by page type and slug is read here for its slug alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
  ],
} as const satisfies Module
