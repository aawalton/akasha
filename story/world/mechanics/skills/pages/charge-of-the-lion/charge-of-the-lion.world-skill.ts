import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const chargeOfTheLion = {
  id: "01a06575-97fa-74d6-ae86-3de9a7c00300",
  type: "page-type/world-skill",
  slug: "charge-of-the-lion",
  title: "Charge of the Lion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
