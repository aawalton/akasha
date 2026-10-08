import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const toughSkin = {
  id: "01a06572-95e7-76c6-8064-1a8c2a54a91d",
  type: "page-type/world-spell",
  slug: "tough-skin",
  title: "Tough Skin",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.431Z",
  updatedAt: "2026-09-22T13:35:05.000Z",
} as const satisfies WorldSpell
