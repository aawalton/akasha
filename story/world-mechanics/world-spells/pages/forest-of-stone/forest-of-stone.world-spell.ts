import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const forestOfStone = {
  id: "01a06572-95c5-7078-b8fb-f75d831b4012",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "forest-of-stone",
  title: "Forest of Stone",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
