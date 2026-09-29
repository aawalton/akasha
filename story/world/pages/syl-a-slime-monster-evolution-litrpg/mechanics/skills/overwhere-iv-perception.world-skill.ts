import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overwhereIvPerception = {
  id: "01a0ed30-cadd-78a0-84cf-9806f5396e0e",
  type: "page-type/world-skill",
  slug: "overwhere-iv-perception",
  title: "Perception",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  description: "Sharper senses for what is hidden, far off or easily missed.",
} as const satisfies WorldSkill
