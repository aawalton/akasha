import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const forceArrow = {
  id: "01a06572-95c4-7ebb-8713-19051e154a91",
  type: "page-type/world-spell",
  slug: "force-arrow",
  title: "Force Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
