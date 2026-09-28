import type { WorldCondition } from "akasha/story/world/mechanics/conditions/world-condition.page-type.types.ts"

export const superSupportiveSkillImbalance = {
  id: "01a0e9f3-f5f6-7c68-b6d6-7cd8c2823108",
  type: "page-type/world-condition",
  slug: "super-supportive-skill-imbalance",
  title: "Skill imbalance",
  world: "world/super-supportive",
  aliases: ["A scale tips", "imbalance and loss of skill assignment"],
  description:
    "A dangerous state where free authority grows strong enough to break an Avowed's affixation.",
} as const satisfies WorldCondition
