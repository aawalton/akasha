import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const thinkHarder = {
  id: "01a0657d-0313-787a-be0d-e41ab3f6ea02",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "think-harder",
  title: "Think Harder",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
