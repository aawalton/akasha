import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherCleave = {
  id: "01a10363-fe42-7ac7-a1cf-7198e41c63ae",
  type: "page-type/world-skill",
  slug: "fairweather-cleave",
  title: "Cleave",
  world: "world/fairweather",
  description: "A Berserker skill: one great sweeping blow that strikes every foe within reach.",
} as const satisfies WorldSkill
