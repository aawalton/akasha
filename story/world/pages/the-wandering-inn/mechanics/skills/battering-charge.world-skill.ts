import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const batteringCharge = {
  id: "01a06575-97f4-76f2-8d9d-993516581a7c",
  type: "page-type/world-skill",
  slug: "battering-charge",
  title: "Battering Charge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
