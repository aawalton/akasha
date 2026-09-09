import type { Module } from "@akasha/code/module"

export const markdownDocument = {
  id: "01a05cc6-2a1c-7052-a972-698c701753b4",
  pageTypeSlug: "module",
  type: "module",
  slug: "markdown-document",
  definition: "the shape a markdown page takes once it is parsed",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every part of a parsed document has the span that part was read from.",
    },
    {
      invariantKind: "departure",
      statement: "A part that could not be read is carried as a span rather than dropped.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here parses or judges anything.",
    },
  ],
} as const satisfies Module
