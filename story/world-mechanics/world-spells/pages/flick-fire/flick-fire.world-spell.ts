import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flickFire = {
  id: "01a06572-95c4-7e90-a3e8-f4d9f376cd32",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "flick-fire",
  title: "Flick Fire",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
