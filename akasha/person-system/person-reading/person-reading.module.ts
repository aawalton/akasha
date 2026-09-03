import type { Module } from "@akasha/code-system/module"

export const personReading = {
  id: "01a06949-b280-74de-b0a9-61069c314f1a",
  pageTypeSlug: "module",
  slug: "person-reading",
  definition: "person pages read back as who someone is, one by slug or all of them sorted",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An empty set of people is an error rather than a household of nobody.",
    },
    {
      invariantKind: "departure",
      statement: "People come back sorted by slug.",
    },
    {
      invariantKind: "departure",
      statement: "A person page that will not load raises an error naming the file.",
    },
    {
      invariantKind: "departure",
      statement: "A person page stating no slug raises an error rather than an unnamed person.",
    },
    {
      invariantKind: "departure",
      statement: "A slug naming no person reads as null.",
    },
    {
      invariantKind: "departure",
      statement: "A person required by slug where none answers is an error.",
    },
  ],
} as const satisfies Module
