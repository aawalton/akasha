import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const dispelMagic = {
  id: "01a06572-95be-7347-ae9f-b4cac17363f0",
  type: "page-type/world-spell",
  slug: "dispel-magic",
  title: "Dispel Magic",
  world: "world/the-wandering-inn",
  appearanceCount: 29,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.390Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
