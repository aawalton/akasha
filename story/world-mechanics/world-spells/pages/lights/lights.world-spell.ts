import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lights = {
  id: "01a06572-95d0-7492-9cf0-b77fdee04521",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "lights",
  title: "Lights",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
