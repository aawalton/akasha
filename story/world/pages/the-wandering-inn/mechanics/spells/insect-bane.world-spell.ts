import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const insectBane = {
  id: "01a06572-95cb-7abd-8179-d6b4250ee7af",
  type: "page-type/world-spell",
  slug: "insect-bane",
  title: "Insect Bane",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
