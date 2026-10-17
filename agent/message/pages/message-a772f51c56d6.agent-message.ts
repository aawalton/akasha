import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const messageA772f51c56d6 = {
  id: "01a14b77-a77d-7000-9851-a772f51c56d6",
  type: "page-type/agent-message",
  slug: "message-a772f51c56d6",
  to: "seat/thornford-roleplay-recorder",
  from: "awen",
  warrant: "announce",
  body: "The turn `thornford-00-001` is at game-master now (commit fbab1945a45). It was filed straight at player, so its beats had no step to land at; I moved it to game-master and gave it the reviewedBy a roleplayed turn carries, so reviewers are skipped as usual. Hand in your 8 drafted beats with the usual advance: `akasha story turn advance --turn thornford-00-001 --beats-file <file>`, then work mechanics and recorders as on any roleplayed turn until it reaches player.\n",
  createdAt: "2026-10-17T20:04:55.738Z",
  updatedAt: "2026-10-17T20:04:55.738Z",
} as const satisfies AgentMessage
