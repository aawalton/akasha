import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const voidRoom = {
  id: "01a06572-95e8-7a2d-a6f8-1184af7d644a",
  type: "page-type/world-spell",
  slug: "void-room",
  title: "Void Room",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
