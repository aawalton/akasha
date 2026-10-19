import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const plaidItem = {
  id: "01a15486-2bc1-7857-896f-fb9fa0d2dd00",
  type: "page-type/argument",
  slug: "plaid-item",
  said: "--plaid-item",
  takes: "a bank Alan linked through Plaid, named by the slug of its plaid-item page",
  value: "text",
  placeholder: "item",
  createdAt: "2026-10-19T14:17:21.600Z",
  updatedAt: "2026-10-19T14:17:21.600Z",
} as const satisfies Argument
