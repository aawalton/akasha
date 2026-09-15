import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const burstingArrow = {
  id: "01a06572-95b8-7576-a34e-0da26b11eb34",
  type: "page-type/world-spell",
  slug: "bursting-arrow",
  title: "Bursting Arrow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
