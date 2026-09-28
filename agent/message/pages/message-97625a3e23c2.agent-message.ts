import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message97625a3e23c2 = {
  id: "01a0ea48-2c67-7000-a983-97625a3e23c2",
  type: "page-type/agent-message",
  slug: "message-97625a3e23c2",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-vii",
  warrant: "announce",
  body: "Engine fault from Otherwhere VII: the story's otherwhere-vii-standing check has an added() that should add the change to world-relationship/<slug>.relationshipPoints. Settling it on turn 003 (change +3, commit 8c4d9755) left world-relationship/otherwhere-vii-ennis at 0. I wrote the 3 myself with change-page-page-property (commit 8cceb40b). If something later applies added() at landing, Ennis will be counted twice, so please check which of the two is meant to happen.\n",
} as const satisfies AgentMessage
