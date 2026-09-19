import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const noPullingOut = {
  id: "01a0657d-027b-7f2f-978f-5aed1298c604",
  type: "page-type/world-skill",
  slug: "no-pulling-out",
  title: "No Pulling Out",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
