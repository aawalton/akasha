import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherDistil = {
  id: "01a10363-fe43-7ef9-938f-34285a9c408d",
  type: "page-type/world-skill",
  slug: "fairweather-distil",
  title: "Distil",
  world: "world/fairweather",
  description:
    "An Alchemist skill: the Alchemist draws the pure essence out of a plant or mineral.",
  createdAt: "2026-10-03T20:10:47.235Z",
  updatedAt: "2026-10-03T20:10:50.000Z",
} as const satisfies WorldSkill
