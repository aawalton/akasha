import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const curseOfTheFrozenFlesh = {
  id: "01a06572-95bb-7c77-91c5-d0beb315a940",
  type: "page-type/world-spell",
  slug: "curse-of-the-frozen-flesh",
  title: "Curse of the Frozen Flesh",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.387Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
