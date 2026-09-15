import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const airShield = {
  id: "01a06572-95b3-7f1c-a71e-e825f309df68",
  type: "world-spell",
  slug: "air-shield",
  title: "Air Shield",
  world: "world/the-wandering-inn",
} as const satisfies WorldSpell
