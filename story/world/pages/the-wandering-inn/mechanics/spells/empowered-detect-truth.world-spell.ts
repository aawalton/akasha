import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const empoweredDetectTruth = {
  id: "01a06572-95bf-7bf4-94e6-afdb4f95dc03",
  type: "page-type/world-spell",
  slug: "empowered-detect-truth",
  title: "Empowered Detect Truth",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
