import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const spireOfMud = {
  id: "01a06572-95e2-74bb-90a4-665ab38ecc5d",
  type: "page-type/world-spell",
  slug: "spire-of-mud",
  title: "Spire of Mud",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
