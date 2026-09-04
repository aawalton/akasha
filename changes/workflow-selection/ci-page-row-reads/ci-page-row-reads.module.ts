import type { Module } from "@akasha/code-system/module"

export const ciPageRowReads = {
  id: "01a0685e-023f-7009-95be-f650c7324312",
  pageTypeSlug: "module",
  slug: "ci-page-row-reads",
  definition: "a text or a list read off a row somebody else has already read off a CI page",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Reading a row reaches no page and asks no query.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value that is not a text, or is a text of nothing but spaces, is read as absent.",
    },
    {
      invariantKind: "departure",
      statement: "A key the row does not hold is read as absent rather than throwing.",
    },
  ],
} as const satisfies Module
