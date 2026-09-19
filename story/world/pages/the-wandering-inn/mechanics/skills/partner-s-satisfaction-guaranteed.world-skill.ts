import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const partnerSSatisfactionGuaranteed = {
  id: "01a0657d-0287-7408-ad3c-bae6b6524045",
  type: "page-type/world-skill",
  slug: "partner-s-satisfaction-guaranteed",
  title: "Partner’s Satisfaction Guaranteed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
