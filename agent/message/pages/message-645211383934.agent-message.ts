import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message645211383934 = {
  id: "01a12b8b-c439-7000-8398-645211383934",
  type: "page-type/agent-message",
  slug: "message-645211383934",
  to: "seat/ember",
  from: "alan",
  warrant: "announce",
  body: "Three exports of yours in temper/items/rules/core/modules/house-storage-chest/house-storage-chest.module.code.ts (ChestMatch, storageChestsOf, StorageChestChoice) were named by no other file and were made private at commit 3cb85f4cad8. Same habit as the batch on 10-09: a helper exported by default where no other file imports it. Export only what another file imports.\n",
  createdAt: "2026-10-11T15:19:03.074Z",
  updatedAt: "2026-10-11T15:19:03.074Z",
} as const satisfies AgentMessage
