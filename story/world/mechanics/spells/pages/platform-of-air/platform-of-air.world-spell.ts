import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const platformOfAir = {
  id: "01a06572-95db-7910-8560-85995136471a",
  type: "page-type/world-spell",
  slug: "platform-of-air",
  title: "Platform of Air",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
