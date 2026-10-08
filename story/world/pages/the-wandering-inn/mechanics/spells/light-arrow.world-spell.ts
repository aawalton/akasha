import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightArrow = {
  id: "01a06572-95cd-723f-8d9d-f99528c0abdb",
  type: "page-type/world-spell",
  slug: "light-arrow",
  title: "Light Arrow",
  world: "world/the-wandering-inn",
  appearanceCount: 36,
  aliases: ["light-arrows"],
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.405Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
