import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const defyGravity = {
  id: "01a06572-95bc-744f-a757-127ce1543b6e",
  type: "page-type/world-spell",
  slug: "defy-gravity",
  title: "Defy Gravity",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.388Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
