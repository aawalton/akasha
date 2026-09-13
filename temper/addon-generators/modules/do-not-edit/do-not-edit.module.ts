import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const doNotEdit = {
  id: "01a09457-a329-7ebe-98b4-f71eb796b0ce",
  type: "module",
  slug: "do-not-edit",
  definition: "the line telling a reader of a rendered file not to edit that file",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The line tells a reader the file is written out rather than edited.",
    },
    {
      invariantKind: "absence",
      statement: "No generator spells the line.",
    },
  ],
} as const satisfies Module
