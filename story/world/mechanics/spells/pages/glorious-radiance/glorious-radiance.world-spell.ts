import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const gloriousRadiance = {
  id: "01a06572-95c6-736f-8f93-59c7ffbcc7c6",
  type: "page-type/world-spell",
  slug: "glorious-radiance",
  title: "Glorious Radiance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
