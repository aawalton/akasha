import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const prayersOfHealing = {
  id: "01a0657d-0296-7668-87b0-88bd30a4f113",
  type: "page-type/world-skill",
  slug: "prayers-of-healing",
  title: "Prayers of Healing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
