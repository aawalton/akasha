import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const windblast = {
  id: "01a06572-95ea-7c4a-a15f-33c1ccc2c7f0",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "windblast",
  title: "Windblast",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
