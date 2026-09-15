import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const improvedFeatherfall = {
  id: "01a06572-95cb-704d-baf7-5101e7ade4e7",
  type: "world-spell",
  slug: "improved-featherfall",
  title: "Improved Featherfall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
