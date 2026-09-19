import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lesserParalysisRay = {
  id: "01a06572-95cd-799c-8024-9820460ce8a9",
  type: "page-type/world-spell",
  slug: "lesser-paralysis-ray",
  title: "Lesser Paralysis Ray",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
