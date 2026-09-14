import type { ModelProvider } from "akasha/agents/model/providers/model-provider.page-type.types.ts"

export const anthropic = {
  id: "01a0a217-368a-7225-a40c-e59231bfb52b",
  type: "model-provider",
  slug: "anthropic",
  definition: "the provider that serves Claude",
  apiBase: "https://api.anthropic.com",
} as const satisfies ModelProvider
