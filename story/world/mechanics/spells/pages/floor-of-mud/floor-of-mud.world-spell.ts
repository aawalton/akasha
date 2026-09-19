import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const floorOfMud = {
  id: "01a06572-95c4-7692-ae01-62936aa5a8b3",
  type: "page-type/world-spell",
  slug: "floor-of-mud",
  title: "Floor of Mud",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
