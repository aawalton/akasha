import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const blind = {
  id: "01a06572-95b6-790c-830c-a5bace40ad28",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "blind",
  title: "Blind",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
