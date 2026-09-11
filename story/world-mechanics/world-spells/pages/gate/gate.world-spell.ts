import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const gate = {
  id: "01a06572-95c6-771a-b730-82151bae0db7",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "gate",
  title: "Gate",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
