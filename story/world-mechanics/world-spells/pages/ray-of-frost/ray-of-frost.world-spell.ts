import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const rayOfFrost = {
  id: "01a06572-95dc-76c4-8815-78c2675ab2cd",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "ray-of-frost",
  title: "Ray of Frost",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
