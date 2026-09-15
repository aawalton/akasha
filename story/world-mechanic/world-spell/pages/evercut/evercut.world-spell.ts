import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const evercut = {
  id: "01a06572-95bf-76eb-8c53-f9c249c79190",
  type: "world-spell",
  slug: "evercut",
  title: "Evercut",
  world: "world/the-wandering-inn",
} as const satisfies WorldSpell
