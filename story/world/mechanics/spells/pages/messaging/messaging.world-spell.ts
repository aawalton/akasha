import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const messaging = {
  id: "01a06572-95d8-7f58-ad75-41cf8c714975",
  type: "page-type/world-spell",
  slug: "messaging",
  title: "Messaging",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
