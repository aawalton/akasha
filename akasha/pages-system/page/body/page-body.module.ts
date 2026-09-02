import type { Module } from "@akasha/code-system/module"

export const pageBody = {
  id: "01a05de5-1c90-7834-a245-bb7748f6f1ea",
  pageTypeSlug: "module",
  slug: "page-body",
  definition: "the TypeScript a page is, written from the values it carries",
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
        "A key the values carry and the caller does not name is answered rather than written.",
    },
    {
      invariantKind: "departure",
      statement: "A value is written as JSON.",
    },
    {
      invariantKind: "departure",
      statement: "Only what JSON holds may be a value.",
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
      statement: "Nothing here formats what this module wrote.",
    },
    {
      invariantKind: "departure",
      statement: "What lands the body mints and formats the body.",
    },
  ],
} as const satisfies Module
