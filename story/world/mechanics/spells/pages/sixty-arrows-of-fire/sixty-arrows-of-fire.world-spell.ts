import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const sixtyArrowsOfFire = {
  id: "01a06572-95e1-7f7a-b6c8-b9a76e310df5",
  type: "page-type/world-spell",
  slug: "sixty-arrows-of-fire",
  title: "Sixty Arrows of Fire",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
