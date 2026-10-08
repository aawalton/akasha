import type { ModelProvider } from "akasha/agent/model/provider/model-provider.page-type.types.ts"

export const anthropic = {
  id: "01a0a217-368a-7225-a40c-e59231bfb52b",
  type: "page-type/model-provider",
  slug: "anthropic",
  definition: "the external service that runs the models Anthropic makes",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Anthropic" }],
  apiBase: "https://api.anthropic.com",
  createdAt: "2026-09-14T22:43:45.418Z",
  updatedAt: "2026-09-25T17:59:02.000Z",
} as const satisfies ModelProvider
