import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const gmailSchema = {
  id: "01a05c0e-372f-7384-9024-babc64ceccf2",
  pageTypeSlug: "module",
  slug: "gmail-schema",
  definition: "the shapes Gmail answers in, and what is taken out of them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field Gmail sends that is not asked for is kept rather than dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A header is matched without regard to case.",
    },
    {
      invariantKind: "departure",
      statement: "The body taken is the first plain-text part found walking the parts.",
    },
    {
      invariantKind: "departure",
      statement: "A message part holds parts of its own.",
    },
  ],
} as const satisfies Module
