import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const luckyMoment = {
  id: "01a0657d-0241-7581-bab2-0c8e145fc24a",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "lucky-moment",
  title: "Lucky Moment",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
