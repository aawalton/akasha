import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const karazSandstorm = {
  id: "01a06572-95cc-7df9-8688-27ba9eee8cd7",
  type: "page-type/world-spell",
  slug: "karaz-sandstorm",
  title: "Karaz Sandstorm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
