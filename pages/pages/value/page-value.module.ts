import type { Module } from "@akasha/code-system/module"

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
      statement: "A page's body can be loaded after the file the body came from is gone.",
    },
    {
      invariantKind: "departure",
      statement: "The value a body declares is the first object the body exports.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not load answers with why rather than with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A body is loaded without a file being written.",
    },
    {
      invariantKind: "departure",
      statement: "A body importing a value rather than a type does not load.",
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
      invariantKind: "departure",
      statement: "A key naming one page or a list of them is read here as a list of slugs.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the index.",
    },
    {
      invariantKind: "departure",
      statement: "Importing this module makes no transpiler.",
    },
    {
      invariantKind: "departure",
      statement: "A runtime holding no transpiler refuses rather than answering nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not load is told apart from a runtime that cannot load.",
    },
  ],
} as const satisfies Module
