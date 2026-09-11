import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const secondBlazingSun = {
  id: "01a06572-95df-7c84-afd0-41395bfbafe5",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "second-blazing-sun",
  title: "Second Blazing Sun",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
