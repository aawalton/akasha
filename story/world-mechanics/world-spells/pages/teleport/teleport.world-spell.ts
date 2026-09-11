import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const teleport = {
  id: "01a06572-95e6-7a17-96ff-0bfb3117a1ad",
  type: "world-spell",
  slug: "teleport",
  title: "Teleport",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
