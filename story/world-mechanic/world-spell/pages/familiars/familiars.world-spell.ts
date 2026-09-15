import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const familiars = {
  id: "01a06572-95c0-778b-85dc-529b807b834e",
  type: "page-type/world-spell",
  slug: "familiars",
  title: "Familiars",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
