import type { Module } from "@akasha/code/module"

export const seatBeside = {
  id: "01a06949-b281-7c3a-b172-8f45292e9e17",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-beside",
  definition: "what is observed of a seat, carried into akasha under the names declared there",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every write of a value observed of a seat reaches akasha and nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "A key akasha has nothing for is refused rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A write for a seat with no page in akasha is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A record is written whole.",
    },
    {
      invariantKind: "departure",
      statement: "A partial write takes a record's other fields away.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record carrying a value and nothing but an optional stamp is written as that value.",
    },
    {
      invariantKind: "departure",
      statement: "A record with anything else is written whole.",
    },
    {
      invariantKind: "departure",
      statement: "Only a value held at the top of the page is taken away on its own.",
    },
    {
      invariantKind: "departure",
      statement: "A removal that fails is reported and does not halt its caller.",
    },
    {
      invariantKind: "departure",
      statement: "A seat is named here, and a seat's page path is read for that name.",
    },
    {
      invariantKind: "departure",
      statement: "A removal names the seat rather than reaching that seat's page.",
    },
  ],
} as const satisfies Module
