import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatBeside = {
  id: "01a06949-b281-7c3a-b172-8f45292e9e17",
  type: "page-type/module",
  slug: "seat-beside",
  definition: "what is observed of a seat, carried into akasha under the names declared there",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every write of a value observed of a seat reaches akasha and nowhere else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key akasha has nothing for is refused rather than dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write for a seat with no page in akasha is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record is written whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A partial write takes a record's other fields away.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A record carrying a value and nothing but an optional stamp is written as that value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record with anything else is written whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value naming a page is written as that page's address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat is named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's page path is read for the name that seat is named by.",
    },
  ],
} as const satisfies Module
