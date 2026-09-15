import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const personReading = {
  id: "01a06949-b280-74de-b0a9-61069c314f1a",
  type: "module",
  slug: "person-reading",
  definition: "person pages read back as who someone is, one by slug or all of them sorted",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty set of people is an error rather than a household of nobody.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "People come back sorted by slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A person page that will not load raises an error naming the file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A person page stating no slug raises an error rather than an unnamed person.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug naming no person reads as null.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The persona answering for a person reads back as her slug alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A person required by slug where none answers is an error.",
    },
  ],
} as const satisfies Module
