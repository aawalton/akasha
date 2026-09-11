import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lightWall = {
  id: "01a06572-95ce-717a-88bf-834d8608c14e",
  type: "world-spell",
  slug: "light-wall",
  title: "Light Wall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
