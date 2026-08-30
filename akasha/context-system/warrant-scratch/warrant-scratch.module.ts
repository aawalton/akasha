import type { Module } from "../../code-system/module/module.page-type.ts"

export const warrantScratch = {
  id: "01a05003-1c21-749b-ad55-103dc92a9390",
  pageTypeSlug: "module",
  slug: "warrant-scratch",
  definition: "an index stood up in a scratch root for a context warrant's test to answer from",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where the index stands is reached through the reader that says it.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a warrant answered is read for its paths alone, and the warrant that answered is " +
        "named at the call.",
    },
    {
      invariantKind: "absence",
      statement:
        "No root is made or swept here, and no body is put anywhere but the index. A test says " +
        "where its scratch stands, and scratching stands the bodies in it.",
    },
    {
      invariantKind: "absence",
      statement: "No test is written here.",
    },
    {
      invariantKind: "absence",
      statement: "What stands here is stood up by the warrant tests that reach for it.",
    },
  ],
} as const satisfies Module
