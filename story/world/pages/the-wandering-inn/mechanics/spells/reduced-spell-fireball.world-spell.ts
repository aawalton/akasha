import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const reducedSpellFireball = {
  id: "01a06572-95dc-7cca-9472-02487f578a9f",
  type: "page-type/world-spell",
  slug: "reduced-spell-fireball",
  title: "Reduced Spell: Fireball",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.420Z",
  updatedAt: "2026-09-22T13:34:57.000Z",
} as const satisfies WorldSpell
