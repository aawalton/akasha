import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flashstepped = {
  id: "01a06572-95c4-7fd3-99ab-00f962a96abb",
  type: "page-type/world-spell",
  slug: "flashstepped",
  title: "Flashstepped",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
