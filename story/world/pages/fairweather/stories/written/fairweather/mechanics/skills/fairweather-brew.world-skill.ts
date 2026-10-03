import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherBrew = {
  id: "01a10363-fe42-73e7-912d-1cb12bbcd064",
  type: "page-type/world-skill",
  slug: "fairweather-brew",
  title: "Brew",
  world: "world/fairweather",
  description:
    "An Alchemist skill: the Alchemist pours power into a mixture to make a potion, salve or powder.",
} as const satisfies WorldSkill
