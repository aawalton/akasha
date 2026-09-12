import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const indexFiling = {
  id: "01a08e9f-f494-79ea-9155-8f6f56dbf41c",
  type: "module",
  slug: "index-filing",
  definition: "the index lines and page bodies a test files into a root of its own",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Where a line is filed is worked out here rather than beside a module.",
    },
    {
      invariantKind: "departure",
      statement:
        "A line filed at a whole path is written under the root that path is read against.",
    },
    {
      invariantKind: "departure",
      statement: "A line is written closed by a line end.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a line back.",
    },
    {
      invariantKind: "departure",
      statement: "A value filed for a page is written as that page's body at that page's path.",
    },
    {
      invariantKind: "departure",
      statement: "A value carrying no id is a shape rather than a page, and leaves no body.",
    },
    {
      invariantKind: "departure",
      statement: "A body already at that path is left as the caller wrote it.",
    },
  ],
} as const satisfies Module
