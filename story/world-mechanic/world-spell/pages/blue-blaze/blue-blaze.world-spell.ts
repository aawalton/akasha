import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const blueBlaze = {
  id: "01a06572-95b6-7ce0-955c-88b639f0440d",
  type: "world-spell",
  slug: "blue-blaze",
  title: "Blue Blaze",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
