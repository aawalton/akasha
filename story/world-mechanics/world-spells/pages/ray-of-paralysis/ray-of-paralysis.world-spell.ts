import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const rayOfParalysis = {
  id: "01a06572-95dc-7c34-aede-7f55a37fdc37",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "ray-of-paralysis",
  title: "Ray of Paralysis",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
