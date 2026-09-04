import type { WorldSpell } from "../../world-spell.page-type.ts"

export const summonBlackHole = {
  id: "01a06572-95e4-7442-b8c6-d2f0bfbeba37",
  pageTypeSlug: "world-spell",
  slug: "summon-black-hole",
  title: "Summon Black Hole",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
