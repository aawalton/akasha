import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const infernoRay = {
  id: "01a06572-95cb-7c05-a842-622ae90ec707",
  type: "page-type/world-spell",
  slug: "inferno-ray",
  title: "Inferno Ray",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
