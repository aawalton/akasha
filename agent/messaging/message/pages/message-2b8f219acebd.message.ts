import type { Message } from "akasha/agent/messaging/message/message.page-type.types.ts"

export const message2b8f219acebd = {
  id: "01a0c668-9dc2-7000-9432-2b8f219acebd",
  type: "page-type/message",
  slug: "message-2b8f219acebd",
  to: "seat/thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at 7fb8b9caf25ee096e47786f0b4cab90dcf8d49ac found 1 check newly refusing.\n`page-matches-its-type` refused 10 times:\n  story/game/pages/harem-hotel/entities/harem-hotel-alan.game-entity.ts — `listed-note` runs to 548 characters, over the length of 500\n  story/game/pages/partners-ii/entities/partners-ii-abby.game-entity.ts — `listed-note` runs to 1131 characters, over the length of 500\n  story/game/pages/partners-ii/entities/partners-ii-aura.game-entity.ts — `listed-note` runs to 816 characters, over the length of 500\n  story/game/pages/partners-ii/entities/partners-ii-erin.game-entity.ts — `listed-note` runs to 779 characters, over the length of 500\n  story/game/pages/partners/entities/partners-abby.game-entity.ts — `listed-note` runs to 1131 characters, over the length of 500\nwhat each of them answered is on the newest row of the audit log beside that check's page.\n",
} as const satisfies Message
