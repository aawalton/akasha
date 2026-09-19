import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const convincingSmile = {
  id: "01a06575-97fd-780e-9b5c-ba2760bf72ba",
  type: "page-type/world-skill",
  slug: "convincing-smile",
  title: "Convincing Smile",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
