import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherEndure = {
  id: "01a10363-fe43-723a-add8-3eb25e7d9cd1",
  type: "page-type/world-skill",
  slug: "fairweather-endure",
  title: "Endure",
  world: "world/fairweather",
  description:
    "A Berserker skill: the Berserker shrugs off pain and keeps her feet through wounds.",
} as const satisfies WorldSkill
