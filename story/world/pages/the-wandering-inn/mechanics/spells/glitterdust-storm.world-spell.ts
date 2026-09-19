import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const glitterdustStorm = {
  id: "01a06572-95c6-7f79-81fb-554dbd2e3a55",
  type: "page-type/world-spell",
  slug: "glitterdust-storm",
  title: "Glitterdust Storm",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
