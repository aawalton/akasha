import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flamestrike = {
  id: "01a06572-95c3-7a53-8cb5-0d068a88ffcf",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "flamestrike",
  title: "Flamestrike",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
