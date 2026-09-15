import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const urgentMessage = {
  id: "01a06572-95e8-764b-a6bd-abda39323fa8",
  type: "page-type/world-spell",
  slug: "urgent-message",
  title: "Urgent Message",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
