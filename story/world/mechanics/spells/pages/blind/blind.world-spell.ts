import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const blind = {
  id: "01a06572-95b6-790c-830c-a5bace40ad28",
  type: "page-type/world-spell",
  slug: "blind",
  title: "Blind",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
