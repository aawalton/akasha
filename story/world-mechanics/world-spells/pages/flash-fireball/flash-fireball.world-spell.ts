import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flashFireball = {
  id: "01a06572-95c3-777a-b967-2106dc60387d",
  type: "world-spell",
  slug: "flash-fireball",
  title: "Flash Fireball",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
