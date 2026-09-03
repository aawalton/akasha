import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchAmazonOrder = {
  id: "01a06863-8dd7-7e4b-b3a0-aceedce9757e",
  pageTypeSlug: "module",
  slug: "monarch-amazon-order",
  definition: "an Amazon order read out of the confirmation mail Amazon sends",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An order is read from the mail Amazon sent rather than from Amazon's own site.",
    },
    {
      invariantKind: "departure",
      statement:
        "A mail naming no order number is no order and is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "An order number is the three-seven-seven shape Amazon writes.",
    },
    {
      invariantKind: "departure",
      statement:
        "Money is read into cents so that a total compares against a transaction's amount.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bidirectional marks Amazon writes into a subject are struck before the subject is read.",
    },
    {
      invariantKind: "departure",
      statement: "A summary is what the subject says after its first colon.",
    },
    {
      invariantKind: "departure",
      statement: "An item with no stated price is kept with no price rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A date that cannot be parsed is refused rather than read as nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches Amazon or Gmail.",
    },
  ],
} as const satisfies Module
