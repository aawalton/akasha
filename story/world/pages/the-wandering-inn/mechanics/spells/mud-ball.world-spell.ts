import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const mudBall = {
  id: "01a06572-95d9-7eeb-998d-4ad0dfa6aae9",
  type: "page-type/world-spell",
  slug: "mud-ball",
  title: "Mud Ball",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
