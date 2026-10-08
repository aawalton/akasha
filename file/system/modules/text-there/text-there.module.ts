import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const textThere = {
  id: "01a08e3b-5dd7-722f-9715-fa8d95ddd1b2",
  type: "page-type/module",
  slug: "text-there",
  definition: "the text a path holds, or nothing where the read threw for any reason",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A read that throws for any reason answers that no text is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path holding no file and a path that would not open are one answer.",
    },
  ],
  createdAt: "2026-09-11T02:10:50.455Z",
  updatedAt: "2026-09-25T16:09:55.000Z",
} as const satisfies Module
