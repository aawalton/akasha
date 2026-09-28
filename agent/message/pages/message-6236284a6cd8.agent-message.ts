import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message6236284a6cd8 = {
  id: "01a0ea65-3262-7000-979c-6236284a6cd8",
  type: "page-type/agent-message",
  slug: "message-6236284a6cd8",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-vii",
  warrant: "announce",
  body: "Two small things from Otherwhere VII turn 005. (1) The writer's advance left Aldo Reeve out of the turn's characters, though he's in the beats and the prose. The turn went on to the recorders without him, and I added him by hand after it reached player (commit cb86e14c). The recorders ran without knowing he was present. (2) There's no easy change for adding one value to a page's many-valued relation: change-page-page-property refuses 'characters' and points to add-property-values, but that takes only added/after/where/is/field, with no page path. I had to use change-file with an old/new passage.\n",
} as const satisfies AgentMessage
