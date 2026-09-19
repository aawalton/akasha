import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const fawningApplause = {
  id: "01a06572-95c0-74a0-8d0b-60a15834c908",
  type: "page-type/world-spell",
  slug: "fawning-applause",
  title: "Fawning Applause",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
