import type { WorldSpell } from "../../world-spell.page-type.ts"

export const stoneBarrier = {
  id: "01a06572-95e3-708c-9743-420504779d67",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "stone-barrier",
  title: "Stone Barrier",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
