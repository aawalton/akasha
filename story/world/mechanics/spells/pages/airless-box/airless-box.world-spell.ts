import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const airlessBox = {
  id: "01a06572-95b3-7519-a75b-e34d87a7c489",
  type: "page-type/world-spell",
  slug: "airless-box",
  title: "Airless Box",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
