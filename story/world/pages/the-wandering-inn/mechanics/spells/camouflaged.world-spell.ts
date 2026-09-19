import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const camouflaged = {
  id: "01a06572-95b8-7b49-8480-539e020f0f0c",
  type: "page-type/world-spell",
  slug: "camouflaged",
  title: "Camouflaged",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
