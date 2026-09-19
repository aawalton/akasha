import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const quake = {
  id: "01a06572-95db-7299-a7c4-f4e35b52a094",
  type: "page-type/world-spell",
  slug: "quake",
  title: "Quake",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
