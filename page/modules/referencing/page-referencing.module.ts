import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageReferencing = {
  id: "01a0a2ed-f760-7c93-be7d-baab57691184",
  type: "module",
  slug: "page-referencing",
  definition: "the file beside a page saying what references that page, composed and read",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The name of the file beside a page is composed here and spelled nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "A line is sorted by what it comes through, then the file, then where it is from.",
    },
    {
      invariantKind: "departure",
      statement: "Sorting the lines as text sorts them that way, so no comparison is written.",
    },
    {
      invariantKind: "departure",
      statement: "A line leaves out what it has nothing for rather than writing a null.",
    },
    {
      invariantKind: "departure",
      statement: "Two references alike are one line.",
    },
    {
      invariantKind: "departure",
      statement: "A page nothing references composes an empty body rather than a blank line.",
    },
    {
      invariantKind: "departure",
      statement: "A line that will not parse is left out rather than thrown over.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file or writes one.",
    },
  ],
} as const satisfies Module
