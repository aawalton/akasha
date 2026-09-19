import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const thinkHarder = {
  id: "01a0657d-0313-787a-be0d-e41ab3f6ea02",
  type: "page-type/world-skill",
  slug: "think-harder",
  title: "Think Harder",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
