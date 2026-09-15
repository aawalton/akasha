import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const bloodletter = {
  id: "01a06572-95b6-7c86-a0e3-08ebd76a4df4",
  type: "world-spell",
  slug: "bloodletter",
  title: "Bloodletter",
  world: "world/the-wandering-inn",
} as const satisfies WorldSpell
