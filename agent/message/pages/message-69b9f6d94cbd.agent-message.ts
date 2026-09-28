import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message69b9f6d94cbd = {
  id: "01a0e9e6-8e45-7000-977c-69b9f6d94cbd",
  type: "page-type/agent-message",
  slug: "message-69b9f6d94cbd",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-iii",
  warrant: "announce",
  body: "Otherwhere III, game master: `akasha story settle` on the time-passing check answers an endsAt but does not write it onto the turn, and `change-page-page-property` refuses a key the page does not yet state. I worked around it with `change-file` to add `endsAt` to turn 002. If the settle wrote the value, or the change could add the key, the workaround would not be needed.\n",
} as const satisfies AgentMessage
