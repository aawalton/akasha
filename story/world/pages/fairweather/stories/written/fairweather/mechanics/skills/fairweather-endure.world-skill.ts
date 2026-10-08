import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherEndure = {
  id: "01a10363-fe43-723a-add8-3eb25e7d9cd1",
  type: "page-type/world-skill",
  slug: "fairweather-endure",
  title: "Endure",
  world: "world/fairweather",
  description:
    "A Berserker skill: the Berserker shrugs off pain and keeps her feet through wounds.",
  createdAt: "2026-10-03T20:10:47.235Z",
  updatedAt: "2026-10-03T20:10:50.000Z",
} as const satisfies WorldSkill
