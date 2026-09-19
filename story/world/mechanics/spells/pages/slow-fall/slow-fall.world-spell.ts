import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const slowFall = {
  id: "01a06572-95e1-751a-b401-ec050c458dee",
  type: "page-type/world-spell",
  slug: "slow-fall",
  title: "Slow Fall",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
