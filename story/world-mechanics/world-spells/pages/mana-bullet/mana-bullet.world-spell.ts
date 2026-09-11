import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const manaBullet = {
  id: "01a06572-95d1-78ac-b0a8-d802747bc05b",
  type: "world-spell",
  slug: "mana-bullet",
  title: "Mana Bullet",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["mana-arrow"],
  references: "jsonl",
} as const satisfies WorldSpell
