import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const insectBane = {
  id: "01a06572-95cb-7abd-8179-d6b4250ee7af",
  type: "page-type/world-spell",
  slug: "insect-bane",
  title: "Insect Bane",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.403Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
