import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const chapter = {
  id: "01a06578-5721-7001-b6e6-cb205ab28c07",
  pageTypeSlug: "module",
  slug: "chapter",
  definition: "the conventions a Wandering Inn chapter is named and read by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A title the page did not give falls back to the title the contents listed.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter whose title leaves no slug behind is slugged `untitled`.",
    },
    {
      invariantKind: "departure",
      statement: "The day a chapter was published is read off the chapter's URL.",
    },
    {
      invariantKind: "departure",
      statement: "The links to the chapters either side are no part of a chapter's prose.",
    },
  ],
} as const satisfies Module
