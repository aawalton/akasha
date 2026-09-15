import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dayEntryKeys = {
  id: "01a072fc-7da3-7248-a22d-918364c535de",
  type: "module",
  slug: "day-entry-keys",
  definition: "the keys an entry beside a day is declared as able to carry",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A query guards a key against a page type rather than against the keys of an entry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A key no entry declares is refused rather than answered as absent from every row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Reading a key absent from every row would state silence as a measurement.",
    },
  ],
} as const satisfies Module
