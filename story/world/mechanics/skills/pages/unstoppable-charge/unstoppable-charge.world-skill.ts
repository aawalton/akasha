import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unstoppableCharge = {
  id: "01a0657d-031f-700f-a4cd-21d76385c321",
  type: "page-type/world-skill",
  slug: "unstoppable-charge",
  title: "Unstoppable Charge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
