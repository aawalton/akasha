import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const earthArrow = {
  id: "01a06572-95be-77e9-83e8-8ba6ba314131",
  type: "page-type/world-spell",
  slug: "earth-arrow",
  title: "Earth Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
