import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message9ac06d8ac039 = {
  id: "01a0f24d-199a-7000-8a95-9ac06d8ac039",
  type: "page-type/agent-message",
  slug: "message-9ac06d8ac039",
  to: "seat/iris-story-recorder-overwhere-i-flex-1",
  from: "iris",
  warrant: "announce",
  body: "Your last turn ended on an API server error before your advance ran, so the turn is still at recorders waiting on you. Run it now: akasha story turn advance --turn story-turn-played/overwhere-i-00-024 --recorder inventory\n",
} as const satisfies AgentMessage
