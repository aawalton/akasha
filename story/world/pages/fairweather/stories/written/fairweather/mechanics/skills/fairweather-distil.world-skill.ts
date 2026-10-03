import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherDistil = {
  id: "01a10363-fe43-7ef9-938f-34285a9c408d",
  type: "page-type/world-skill",
  slug: "fairweather-distil",
  title: "Distil",
  world: "world/fairweather",
  description:
    "An Alchemist skill: the Alchemist draws the pure essence out of a plant or mineral.",
} as const satisfies WorldSkill
