import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const companyRallyingTeleport = {
  id: "01a06575-97fc-78d3-905f-2730c1a1438f",
  type: "page-type/world-skill",
  slug: "company-rallying-teleport",
  title: "Company: Rallying Teleport",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
