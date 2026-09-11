import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const hurricaneOfFlames = {
  id: "01a06572-95c9-77c3-806d-355728e9db95",
  type: "world-spell",
  slug: "hurricane-of-flames",
  title: "Hurricane of Flames",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
