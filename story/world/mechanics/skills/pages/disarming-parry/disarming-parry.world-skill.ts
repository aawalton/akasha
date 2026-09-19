import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const disarmingParry = {
  id: "01a06575-9804-79d2-b329-7a03b45612a4",
  type: "page-type/world-skill",
  slug: "disarming-parry",
  title: "Disarming Parry",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
