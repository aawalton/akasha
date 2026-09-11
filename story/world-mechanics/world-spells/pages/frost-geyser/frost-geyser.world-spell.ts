import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const frostGeyser = {
  id: "01a06572-95c5-7988-acbc-d55716cad6e4",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "frost-geyser",
  title: "Frost Geyser",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
