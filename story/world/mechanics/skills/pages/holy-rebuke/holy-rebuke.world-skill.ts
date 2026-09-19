import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const holyRebuke = {
  id: "01a06575-981a-786d-966b-c71ffbbdfe42",
  type: "page-type/world-skill",
  slug: "holy-rebuke",
  title: "Holy Rebuke",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
