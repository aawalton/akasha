import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const noticeAttraction = {
  id: "01a0657d-027b-7420-9fd6-ea28ac3d9257",
  type: "page-type/world-skill",
  slug: "notice-attraction",
  title: "Notice Attraction",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
