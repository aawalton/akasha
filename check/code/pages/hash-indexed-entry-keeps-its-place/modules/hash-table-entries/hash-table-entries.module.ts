import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hashTableEntries = {
  id: "01a0d5c5-e951-7754-bbbd-d7f02de15218",
  type: "page-type/module",
  slug: "hash-table-entries",
  definition: "the entries of a table written in code, in the order the code gives them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A table is read from its code as written rather than by running that code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A name is followed to the constant declaring it, in its own module or one it imports.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A factory's call is read as the table handed to it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every file a table is read through is named with the entries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A table written in a way not read here is answered as unread, saying where and why.",
    },
  ],
} as const satisfies Module
