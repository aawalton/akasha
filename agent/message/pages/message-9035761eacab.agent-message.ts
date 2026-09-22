import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message9035761eacab = {
  id: "01a0cb76-9c91-7000-801a-9035761eacab",
  type: "page-type/agent-message",
  slug: "message-9035761eacab",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at dcc99674491c434a708af00d536285f7e72461e7 found 1 check newly refusing.\n`page-matches-its-type` refused 1 time:\n  person/device-token/pages/alan-alanwalton-2dc366f6ae983c5462ddf29274c1de81.device-token.ts — `device-token-token` runs to 160 characters, over the length of 64\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies AgentMessage
