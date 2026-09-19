import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const talentSeeker = {
  id: "01a0657d-0308-7c94-9770-a40632a4f227",
  type: "page-type/world-skill",
  slug: "talent-seeker",
  title: "Talent Seeker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
