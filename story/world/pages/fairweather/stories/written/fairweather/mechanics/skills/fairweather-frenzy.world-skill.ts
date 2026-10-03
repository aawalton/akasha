import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherFrenzy = {
  id: "01a102af-305c-7fb5-a1c2-6ec05c22166d",
  type: "page-type/world-skill",
  slug: "fairweather-frenzy",
  title: "Frenzy",
  world: "world/fairweather",
  description:
    "A Berserker skill: a red rage of great strength that takes the Berserker past knowing friend from foe.",
} as const satisfies WorldSkill
