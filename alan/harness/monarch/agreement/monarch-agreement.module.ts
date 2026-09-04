import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchAgreement = {
  id: "01a06863-ac0b-7070-8802-ece61d5b73b6",
  pageTypeSlug: "module",
  slug: "monarch-agreement",
  definition: "our copy of Monarch counted against Monarch, and the record filed where they part",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Three counts are compared: every transaction, those needing review, and those uncategorized.",
    },
    {
      invariantKind: "departure",
      statement:
        "Monarch is asked for a count rather than for the rows, so agreement costs three calls.",
    },
    {
      invariantKind: "departure",
      statement: "Our side is counted from the pages rather than from a second query.",
    },
    {
      invariantKind: "departure",
      statement:
        "A transaction naming no category counts as uncategorized alongside one naming the uncategorized page.",
    },
    {
      invariantKind: "departure",
      statement: "A record is filed only where the counts part.",
    },
    {
      invariantKind: "departure",
      statement:
        "The same disagreement is filed once rather than every run, judged against the last body filed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record that fails to file is said rather than thrown, so the reading still stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "Parting is left non-zero, because both home rings draw off our copy and a difference is a number someone is reading as true.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here repairs a disagreement.",
    },
  ],
} as const satisfies Module
