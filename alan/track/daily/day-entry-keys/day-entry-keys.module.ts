import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const dayEntryKeys = {
  id: "01a072fc-7da3-7248-a22d-918364c535de",
  pageTypeSlug: "module",
  type: "module",
  slug: "day-entry-keys",
  definition: "the keys an entry beside a day is declared as able to carry",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "A query guards a key against a page type rather than against the keys of an entry.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key no entry declares is refused rather than answered as absent from every row.",
    },
    {
      invariantKind: "departure",
      statement: "Reading a key absent from every row would state silence as a measurement.",
    },
  ],
} as const satisfies Module
