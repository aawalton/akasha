import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const daringCharge = {
  id: "01a06575-9801-78bd-81cf-711351659591",
  type: "page-type/world-skill",
  slug: "daring-charge",
  title: "Daring Charge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
