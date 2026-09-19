import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flashStepped = {
  id: "01a06572-95c4-7e54-98a7-11b266475ce5",
  type: "page-type/world-spell",
  slug: "flash-stepped",
  title: "Flash Stepped",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
