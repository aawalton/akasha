import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message9d065f56bee3 = {
  id: "01a0d8d4-28bf-7000-8eba-9d065f56bee3",
  type: "page-type/agent-message",
  slug: "message-9d065f56bee3",
  to: "seat/alan",
  from: "audit-running",
  warrant: "announce",
  body: "a run at 659fb6ee45d55462122073470d9dd366876e0249 over 2 checks asked for by name found 1 check newly refusing.\n`typecheck` refused 1 time:\n  temper/player/holdings/temper-sale/pages/sale-scratch-throwaway-1.temper-sale.ts — line 14: TS2322: Type 'string' is not assignable to type 'number'.\nwhat each of them answered is on the newest row of the audit log beside that check's page. This was meant for `thea`, whom nothing could reach: no seat holds the name `thea`, so a message written there would wait in a directory nothing drains. Refused rather than landed, because a send nobody receives must not answer as one that arrived.\n",
} as const satisfies AgentMessage
