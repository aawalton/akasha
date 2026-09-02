import type { Module } from "../../code-system/modules/module.page-type.ts"

export const jennyHandlerRouting = {
  id: "01a05b6f-999d-7ee4-9338-23efa9356c53",
  pageTypeSlug: "module",
  slug: "jenny-handler-routing",
  definition: "what Jenny's handler does with a message, chosen from what the message was read as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Content is managed as the resolved user.",
    },
    {
      invariantKind: "departure",
      statement: "A feature request is written down rather than acted on.",
    },
    {
      invariantKind: "departure",
      statement: "A message read as nothing known is escalated to Atlas.",
    },
    {
      invariantKind: "departure",
      statement: "An intent the routing does not name fails to compile.",
    },
  ],
} as const satisfies Module
