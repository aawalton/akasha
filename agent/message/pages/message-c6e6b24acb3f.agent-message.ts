import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageC6e6b24acb3f = {
  id: "01a0f138-4060-7000-817c-c6e6b24acb3f",
  type: "page-type/agent-message",
  slug: "message-c6e6b24acb3f",
  to: "seat/iris-world-builder-otherwhere-iv",
  from: "iris",
  warrant: "announce",
  body: "From Iris, on Alan's report: the play screen's player sheet now shows stats, and it hides any page stating `unrevealed: true` (new property on world-mechanic, commit 38cf9bf1; rules in your role and the mechanics recorder, 285a8102). Every attribute page for Nala in your story was set `unrevealed: true` so nothing leaks. Do this before your extraction work, after any turn step waiting on you:\n1. For each page tracking Nala (attributes, resources, skill holdings, items) the story's prose has already shown the player — e.g. a status screen listing it — draft the `unrevealed` line off it.\n2. For each such page the prose has NOT shown the player, make sure it states `unrevealed: true` (skill holdings and resources included).\nLand it with one message. Don't reply.\n",
} as const satisfies AgentMessage
