import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const mistsOfMadness = {
  id: "01a06572-95d9-7650-9543-52b989b34560",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mists-of-madness",
  title: "Mists of Madness",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
