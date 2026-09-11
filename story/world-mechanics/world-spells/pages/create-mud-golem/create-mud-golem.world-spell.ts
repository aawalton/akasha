import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const createMudGolem = {
  id: "01a06572-95bb-705d-b4cd-cc819bd5197e",
  type: "world-spell",
  slug: "create-mud-golem",
  title: "Create Mud Golem",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
