import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherBelong = {
  id: "01a1021a-2799-750b-9798-7685c21ff43b",
  type: "page-type/world-skill",
  slug: "fairweather-belong",
  title: "Belong",
  world: "world/fairweather",
  description: "An Enthraller skill that settles where a person belongs, and makes it so.",
} as const satisfies WorldSkill
