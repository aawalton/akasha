import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ownedPuts = {
  id: "01a0d982-8524-7f12-aed1-0f5283c630df",
  type: "page-type/module",
  slug: "owned-puts",
  definition: "the files a write puts or takes away that one module alone writes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A file a write puts or takes away belongs to an entry property where it is a part of that entry.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A write reaching a part of an entry naming its writer is refused unless it names that writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That refusal names the writer to hand the rows to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write names the module it comes through as `writtenBy`.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The service takes the module a write names on that write's word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page types a write reaches are read only where a file is some page's part.",
    },
  ],
} as const satisfies Module
