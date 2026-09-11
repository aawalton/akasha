import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const prayer = {
  id: "01a0657d-0296-7e29-a359-1e8d414cbb7d",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "prayer",
  title: "Prayer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
