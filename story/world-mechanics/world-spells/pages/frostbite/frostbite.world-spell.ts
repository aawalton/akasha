import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const frostbite = {
  id: "01a06572-95c5-7927-aeb0-068c6ebae8ba",
  type: "world-spell",
  slug: "frostbite",
  title: "Frostbite",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
