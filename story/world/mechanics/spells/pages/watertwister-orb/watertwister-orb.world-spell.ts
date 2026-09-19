import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const watertwisterOrb = {
  id: "01a06572-95e9-7589-a022-4cf1ed8e1317",
  type: "page-type/world-spell",
  slug: "watertwister-orb",
  title: "Watertwister Orb",
  world: "world/the-wandering-inn",
} as const satisfies WorldSpell
