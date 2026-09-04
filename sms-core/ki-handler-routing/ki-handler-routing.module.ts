import type { Module } from "../../code-system/modules/module.page-type.ts"

export const kiHandlerRouting = {
  id: "01a05b6f-999d-7d2b-b85c-510e49ca5cd2",
  pageTypeSlug: "module",
  slug: "ki-handler-routing",
  definition: "what Ki's handler does with a message, chosen from what the message was read as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A log is written as the resolved user.",
    },
    {
      invariantKind: "departure",
      statement: "A feature request is written down rather than acted on.",
    },
    {
      invariantKind: "departure",
      statement: "A feature request is weighed by Astra rather than by Ki.",
    },
    {
      invariantKind: "departure",
      statement: "A message read as nothing known is escalated to Aine.",
    },
    {
      invariantKind: "departure",
      statement: "An intent the routing does not name fails to compile.",
    },
  ],
} as const satisfies Module
