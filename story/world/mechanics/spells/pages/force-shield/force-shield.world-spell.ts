import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const forceShield = {
  id: "01a06572-95c4-7003-af85-ca8124ae8ceb",
  type: "page-type/world-spell",
  slug: "force-shield",
  title: "Force Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
