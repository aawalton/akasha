import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const camouflage = {
  id: "01a06572-95b8-776c-811f-d2114da0f207",
  type: "page-type/world-spell",
  slug: "camouflage",
  title: "Camouflage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
