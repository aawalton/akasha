import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const manaBullet = {
  id: "01a06572-95d1-78ac-b0a8-d802747bc05b",
  type: "page-type/world-spell",
  slug: "mana-bullet",
  title: "Mana Bullet",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-spell/mana-arrow"],
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.409Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldSpell
