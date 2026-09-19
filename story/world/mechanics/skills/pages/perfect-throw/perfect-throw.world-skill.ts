import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectThrow = {
  id: "01a0657d-028f-7b15-89ad-49071ecd11c4",
  type: "page-type/world-skill",
  slug: "perfect-throw",
  title: "Perfect Throw",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
