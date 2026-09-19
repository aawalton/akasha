import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const rayOfAcid = {
  id: "01a06572-95dc-7a68-9b25-61cc853d3cb1",
  type: "page-type/world-spell",
  slug: "ray-of-acid",
  title: "Ray of Acid",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
