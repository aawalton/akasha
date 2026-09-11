import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const companyFreeDodge = {
  id: "01a06575-97fc-7cb8-9357-626d901fd5a0",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "company-free-dodge",
  title: "Company: Free Dodge",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
