import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatBeside = {
  id: "01a06949-b281-7c3a-b172-8f45292e9e17",
  type: "module",
  slug: "seat-beside",
  definition: "what is observed of a seat, carried into akasha under the names declared there",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every write of a value observed of a seat reaches akasha and nowhere else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key akasha has nothing for is refused rather than dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write for a seat with no page in akasha is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record is written whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A partial write takes a record's other fields away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A record carrying a value and nothing but an optional stamp is written as that value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record with anything else is written whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a value held at the top of the page is taken away on its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat is named here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat's page path is read for the name that seat is named by.",
    },
  ],
} as const satisfies Module
