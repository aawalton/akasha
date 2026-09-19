import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const companyArmorbaneWeapons = {
  id: "01a06575-97fc-7eff-9cfd-48e285258679",
  type: "page-type/world-skill",
  slug: "company-armorbane-weapons",
  title: "Company: Armorbane Weapons",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
