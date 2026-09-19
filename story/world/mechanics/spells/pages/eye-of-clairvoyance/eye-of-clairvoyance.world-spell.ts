import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const eyeOfClairvoyance = {
  id: "01a06572-95bf-7753-8b6a-3347235d91af",
  type: "page-type/world-spell",
  slug: "eye-of-clairvoyance",
  title: "Eye of Clairvoyance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
