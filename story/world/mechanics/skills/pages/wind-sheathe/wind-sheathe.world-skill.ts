import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const windSheathe = {
  id: "01a0657d-0336-7288-9133-d08a84cd8876",
  type: "page-type/world-skill",
  slug: "wind-sheathe",
  title: "Wind Sheathe",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
