import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const absorptionFireball = {
  id: "01a06572-95b2-7c42-b30d-8369fbf82bfd",
  type: "page-type/world-spell",
  slug: "absorption-fireball",
  title: "Absorption Fireball",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
