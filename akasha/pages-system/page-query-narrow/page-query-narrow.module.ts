import type { Module } from "@akasha/code-system/module"

export const pageQueryNarrow = {
  id: "01a06876-e5ea-7001-86ce-58ce3040f4b6",
  pageTypeSlug: "module",
  slug: "page-query-narrow",
  definition: "the tests a page query narrows by, read out of what a caller stated",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key stated against a bare value is read as a test that the key holds it.",
    },
    {
      invariantKind: "departure",
      statement: "A number and a boolean are read as the text they are written as.",
    },
    {
      invariantKind: "departure",
      statement: "A slot that names no test refuses the whole test rather than being passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A map stating a key and no slot is no test.",
    },
    {
      invariantKind: "departure",
      statement:
        "A test that cannot be read is said as unreadable and the tests beside it still stand.",
    },
    {
      invariantKind: "departure",
      statement: "A `where` that states nothing narrows by nothing and is no fault.",
    },
  ],
} as const satisfies Module
