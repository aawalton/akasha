import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const cursedLightning = {
  id: "01a06572-95bb-74c3-b045-da5cd36d4231",
  type: "page-type/world-spell",
  slug: "cursed-lightning",
  title: "Cursed Lightning",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
