import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const sSiegeFireball = {
  id: "01a06572-95de-77d0-b3ce-705ea7faf8ad",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "s-siege-fireball",
  title: "S-Siege Fireball",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
