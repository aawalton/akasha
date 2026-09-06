import type { Module } from "@akasha/code-system/module"

export const fileWriteNarrow = {
  id: "01a07691-e739-761d-a0ad-befe1dac9d94",
  pageTypeSlug: "module",
  slug: "file-write-narrow",
  definition: "a write's `where` lowered into the tests the service runs, or refused",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every condition is lowered or the whole narrow is refused.",
    },
    {
      invariantKind: "absence",
      statement: "No condition is dropped for being one this cannot carry.",
    },
    {
      invariantKind: "departure",
      statement: "A dropped condition would reach pages the caller never named.",
    },
    {
      invariantKind: "departure",
      statement: "A value that is no text is lowered as its text, a test carrying text.",
    },
    {
      invariantKind: "departure",
      statement: "One key carries one test of each name.",
    },
    {
      invariantKind: "departure",
      statement: "Two tests of different names on one key are carried together.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the service.",
    },
  ],
} as const satisfies Module
