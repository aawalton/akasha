import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const destinationChain = {
  id: "01a094d9-00b5-7ff2-9892-2dd6dc2a1e81",
  type: "page-type/argument",
  slug: "destination-chain",
  said: "--destination-chain",
  takes: "the cascade of destinations the item falls through",
  value: "text",
  placeholder: "json",
  createdAt: "2026-09-12T09:00:44.597Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
