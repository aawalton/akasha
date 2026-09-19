import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const innUnlimitedManaPool = {
  id: "01a06575-981f-7afb-8a32-1077e20c7f3d",
  type: "page-type/world-skill",
  slug: "inn-unlimited-mana-pool",
  title: "Inn: Unlimited Mana Pool",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
