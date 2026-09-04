import type { Module } from "@akasha/code-system/module"

export const seatBeside = {
  id: "01a06949-b281-7c3a-b172-8f45292e9e17",
  pageTypeSlug: "module",
  slug: "seat-beside",
  definition: "what is observed of a seat, carried into akasha under the names declared there",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every write of what is observed of a seat reaches akasha and nowhere else.",
    },
    {
      invariantKind: "departure",
      statement: "A key akasha carries nothing for is refused rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A write for a seat with no page in akasha is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A record is written whole, since a partial write takes its other fields away.",
    },
    {
      invariantKind: "departure",
      statement: "Only a value held at the top of the page is taken away on its own.",
    },
    {
      invariantKind: "departure",
      statement: "A removal that fails is reported and does not halt its caller.",
    },
  ],
} as const satisfies Module
