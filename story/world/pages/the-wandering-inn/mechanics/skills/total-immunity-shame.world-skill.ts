import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const totalImmunityShame = {
  id: "01a0657d-0315-7cde-b8fd-808f26323929",
  type: "page-type/world-skill",
  slug: "total-immunity-shame",
  title: "Total Immunity: Shame",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
