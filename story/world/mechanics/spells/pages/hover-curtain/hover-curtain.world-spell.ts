import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const hoverCurtain = {
  id: "01a06572-95c8-791e-9e20-db00b6b897d9",
  type: "page-type/world-spell",
  slug: "hover-curtain",
  title: "Hover Curtain",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
