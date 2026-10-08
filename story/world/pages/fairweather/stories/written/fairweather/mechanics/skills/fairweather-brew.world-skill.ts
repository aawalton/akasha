import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherBrew = {
  id: "01a10363-fe42-73e7-912d-1cb12bbcd064",
  type: "page-type/world-skill",
  slug: "fairweather-brew",
  title: "Brew",
  world: "world/fairweather",
  description:
    "An Alchemist skill: the Alchemist pours power into a mixture to make a potion, salve or powder.",
  createdAt: "2026-10-03T20:10:47.234Z",
  updatedAt: "2026-10-03T20:10:50.000Z",
} as const satisfies WorldSkill
