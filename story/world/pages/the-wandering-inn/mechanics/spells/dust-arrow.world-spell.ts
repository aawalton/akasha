import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const dustArrow = {
  id: "01a06572-95be-7650-a39a-9846858b183f",
  type: "page-type/world-spell",
  slug: "dust-arrow",
  title: "Dust Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
