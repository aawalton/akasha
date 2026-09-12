import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const negativePrompt = {
  id: "01a094e9-0e55-76b8-930a-c6274a542e1e",
  type: "argument",
  slug: "negative-prompt",
  said: "--negative-prompt",
  takes: "what the sampler is steered away from",
  value: "text",
  placeholder: "text",
} as const satisfies Argument
