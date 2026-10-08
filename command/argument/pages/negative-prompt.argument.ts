import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const negativePrompt = {
  id: "01a094e9-0e55-76b8-930a-c6274a542e1e",
  type: "page-type/argument",
  slug: "negative-prompt",
  said: "--negative-prompt",
  takes: "what the sampler is steered away from",
  value: "text",
  placeholder: "text",
  createdAt: "2026-09-12T09:18:16.661Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
