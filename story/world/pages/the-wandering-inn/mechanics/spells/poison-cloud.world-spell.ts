import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const poisonCloud = {
  id: "01a06572-95db-7c3e-86c8-ca486864bca0",
  type: "page-type/world-spell",
  slug: "poison-cloud",
  title: "Poison Cloud",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
