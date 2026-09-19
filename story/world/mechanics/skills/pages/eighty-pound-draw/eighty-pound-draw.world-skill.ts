import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const eightyPoundDraw = {
  id: "01a06575-9807-706f-8077-00be11687d33",
  type: "page-type/world-skill",
  slug: "eighty-pound-draw",
  title: "Eighty-pound Draw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
