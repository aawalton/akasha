import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const momentOfProtection = {
  id: "01a0657d-026f-7dfa-829d-ff8921bd7530",
  type: "page-type/world-skill",
  slug: "moment-of-protection",
  title: "Moment of Protection",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
