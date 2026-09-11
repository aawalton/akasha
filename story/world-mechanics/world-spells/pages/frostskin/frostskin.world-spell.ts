import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const frostskin = {
  id: "01a06572-95c5-772b-bc5c-31ff4da66855",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "frostskin",
  title: "Frostskin",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
