import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherDevotion = {
  id: "01a1021b-0e9d-74c5-b4f4-9c034c3f08ad",
  type: "page-type/world-skill",
  slug: "fairweather-devotion",
  title: "Devotion",
  world: "world/fairweather",
  description:
    "A passive Enthraller skill: the caster grows stronger by the devotion borne toward them.",
} as const satisfies WorldSkill
