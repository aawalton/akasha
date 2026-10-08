import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const disintegrationRays = {
  id: "01a06572-95bd-75ce-8254-344b5e9a112e",
  type: "page-type/world-spell",
  slug: "disintegration-rays",
  title: "Disintegration Rays",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.389Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
