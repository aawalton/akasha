import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const airlessBox = {
  id: "01a06572-95b3-7519-a75b-e34d87a7c489",
  type: "world-spell",
  slug: "airless-box",
  title: "Airless Box",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
