import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageBody = {
  id: "01a05de5-1c90-7834-a245-bb7748f6f1ea",
  type: "module",
  slug: "page-body",
  definition: "the TypeScript a page is, written from the values it has",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body names the type its page answers to and satisfies the type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body is exported under the name its slug becomes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keys are written in the order the caller names the keys.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key the caller names and the values do not carry is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A key the values have and the caller does not name is answered rather than written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value is written as JSON.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The file a body names its type from is written as a quoted literal is.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A body composed here parses whatever characters that file's path carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only data JSON has may be a value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key inside a value is written bare where TypeScript reads the key bare.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here mints an id.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here formats the body this module wrote.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The landing mints and formats the body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page names its type from the root rather than by a relative path.",
    },
  ],
} as const satisfies Module
