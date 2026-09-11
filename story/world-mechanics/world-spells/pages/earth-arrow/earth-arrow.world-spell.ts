import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const earthArrow = {
  id: "01a06572-95be-77e9-83e8-8ba6ba314131",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "earth-arrow",
  title: "Earth Arrow",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
