import type { Module } from "@akasha/code/module"

export const pageBody = {
  id: "01a05de5-1c90-7834-a245-bb7748f6f1ea",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-body",
  definition: "the TypeScript a page is, written from the values it has",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body names the type its page answers to and satisfies the type.",
    },
    {
      invariantKind: "departure",
      statement: "A body is exported under the name its slug becomes.",
    },
    {
      invariantKind: "departure",
      statement: "The keys are written in the order the caller names the keys.",
    },
    {
      invariantKind: "departure",
      statement: "A key the caller names and the values do not carry is left out.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key the values have and the caller does not name is answered rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "A value is written as JSON.",
    },
    {
      invariantKind: "departure",
      statement: "Only data JSON has may be a value.",
    },
    {
      invariantKind: "departure",
      statement: "A key inside a value is written bare where TypeScript reads the key bare.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here mints an id.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here formats the body this module wrote.",
    },
    {
      invariantKind: "departure",
      statement: "The landing mints and formats the body.",
    },
  ],
} as const satisfies Module
