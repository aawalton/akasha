import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const companyFreeDodge = {
  id: "01a06575-97fc-7cb8-9357-626d901fd5a0",
  type: "page-type/world-skill",
  slug: "company-free-dodge",
  title: "Company: Free Dodge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
