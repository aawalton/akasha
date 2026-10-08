import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightningJolt = {
  id: "01a06572-95d0-776b-ae0f-879cbcf0999c",
  type: "page-type/world-spell",
  slug: "lightning-jolt",
  title: "Lightning Jolt",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.408Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
