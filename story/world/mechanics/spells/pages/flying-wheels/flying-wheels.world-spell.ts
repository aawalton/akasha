import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const flyingWheels = {
  id: "01a06572-95c4-7af4-a771-e7af68514a95",
  type: "page-type/world-spell",
  slug: "flying-wheels",
  title: "Flying Wheels",
  world: "world/the-wandering-inn",
} as const satisfies WorldSpell
