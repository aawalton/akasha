import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const featherweight = {
  id: "01a06572-95c0-7b28-92e8-898ff4bd9872",
  type: "page-type/world-spell",
  slug: "featherweight",
  title: "Featherweight",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
