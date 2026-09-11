import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const blueLightning = {
  id: "01a06572-95b6-7c5a-b8ed-21cd5a88c7a7",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "blue-lightning",
  title: "Blue Lightning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
