import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvDangerSense = {
  id: "01a0ed30-cadd-74eb-9e87-5389781c5a1e",
  type: "page-type/world-skill",
  slug: "overwhere-iv-danger-sense",
  title: "Danger Sense",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "A prickle of warning an instant before a real attack lands.",
} as const satisfies WorldSkill
