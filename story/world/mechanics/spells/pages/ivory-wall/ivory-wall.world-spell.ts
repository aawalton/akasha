import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const ivoryWall = {
  id: "01a06572-95cc-740a-9619-ed5225bc89eb",
  type: "page-type/world-spell",
  slug: "ivory-wall",
  title: "Ivory Wall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
