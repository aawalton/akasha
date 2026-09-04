import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const rollPayload = {
  id: "01a05bc6-fa4a-7011-8651-2145681e82b1",
  pageTypeSlug: "module",
  slug: "roll-payload",
  definition: "the shape one line of a tower game's roll log is written in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A blank line in the log is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A roll is unshown until something says that roll was shown.",
    },
  ],
} as const satisfies Module
