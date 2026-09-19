import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const disarmingShot = {
  id: "01a06575-9804-7ab9-a313-05187acff8c5",
  type: "page-type/world-skill",
  slug: "disarming-shot",
  title: "Disarming Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
