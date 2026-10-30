import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dayEntryKeys = {
  id: "01a072fc-7da3-7248-a22d-918364c535de",
  type: "page-type/module",
  slug: "day-entry-keys",
  definition: "the names of the properties a row of a day can have",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A query guards a key against a page type rather than against the keys of an entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key no entry declares is refused rather than answered as absent from every row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading a key absent from every row would state silence as a measurement.",
    },
  ],
  createdAt: "2026-09-05T19:12:24.995Z",
  updatedAt: "2026-10-30T16:45:32.036Z",
} as const satisfies Module
