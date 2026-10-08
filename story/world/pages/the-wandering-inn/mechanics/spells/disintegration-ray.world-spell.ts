import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const disintegrationRay = {
  id: "01a06572-95bd-7744-9745-aed20d8d0538",
  type: "page-type/world-spell",
  slug: "disintegration-ray",
  title: "Disintegration Ray",
  world: "world/the-wandering-inn",
  appearanceCount: 7,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.389Z",
  updatedAt: "2026-09-22T13:34:24.000Z",
} as const satisfies WorldSpell
