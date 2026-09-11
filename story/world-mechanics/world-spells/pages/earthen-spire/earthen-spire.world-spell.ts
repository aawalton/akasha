import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const earthenSpire = {
  id: "01a06572-95bf-7c69-85c3-1e57fcfc2a69",
  type: "world-spell",
  slug: "earthen-spire",
  title: "Earthen Spire",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
