import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const shieldOfAir = {
  id: "01a06572-95e0-71a6-9ba0-6506478faf7f",
  type: "world-spell",
  slug: "shield-of-air",
  title: "Shield of Air",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
