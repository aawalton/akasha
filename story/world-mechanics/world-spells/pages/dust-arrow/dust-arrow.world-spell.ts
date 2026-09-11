import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const dustArrow = {
  id: "01a06572-95be-7650-a39a-9846858b183f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "dust-arrow",
  title: "Dust Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
