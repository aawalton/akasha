import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const destinationChain = {
  id: "01a094d9-00b5-7ff2-9892-2dd6dc2a1e81",
  type: "argument",
  slug: "destination-chain",
  said: "--destination-chain",
  takes: "the cascade of destinations the item falls through",
  value: "text",
  placeholder: "json",
} as const satisfies Argument
