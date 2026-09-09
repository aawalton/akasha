import type { Module } from "@akasha/code/module"

export const alertRecipientDecide = {
  id: "01a0686d-9d5e-7018-8b7e-f981205706bf",
  pageTypeSlug: "module",
  type: "module",
  slug: "alert-recipient-decide",
  definition: "who answers for an alert, read from the alert's own document",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An alert no document declares reaches nobody.",
    },
    {
      invariantKind: "departure",
      statement: "An alert reaching nobody says so rather than defaulting.",
    },
    {
      invariantKind: "departure",
      statement: "An alert two documents declare picks no document.",
    },
    {
      invariantKind: "departure",
      statement: "An alert naming both a domain and a person names no recipient.",
    },
    {
      invariantKind: "departure",
      statement:
        "An alert naming neither a domain nor a person lands nowhere until a recipient is stated.",
    },
    {
      invariantKind: "departure",
      statement: "A domain answers for an alert through the operator role.",
    },
  ],
} as const satisfies Module
