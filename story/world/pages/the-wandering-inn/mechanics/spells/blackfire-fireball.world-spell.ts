import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const blackfireFireball = {
  id: "01a06572-95b6-71e3-a91a-f8652d9b28bb",
  type: "page-type/world-spell",
  slug: "blackfire-fireball",
  title: "Blackfire Fireball",
  world: "world/the-wandering-inn",
  appearanceCount: 5,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.382Z",
  updatedAt: "2026-09-22T13:34:16.000Z",
} as const satisfies WorldSpell
