import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const diamondSpray = {
  id: "01a06572-95bd-7c2a-b12c-bf561b3f0437",
  type: "world-spell",
  slug: "diamond-spray",
  title: "Diamond Spray",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
