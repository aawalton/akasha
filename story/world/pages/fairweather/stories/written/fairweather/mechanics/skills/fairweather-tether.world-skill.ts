import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherTether = {
  id: "01a10219-efe5-7bdc-a5de-eab60d275030",
  type: "page-type/world-skill",
  slug: "fairweather-tether",
  title: "Tether",
  world: "world/fairweather",
  description:
    "An Enthraller skill that ties a person to the caster by a line of power running both ways.",
  createdAt: "2026-10-03T14:10:16.677Z",
  updatedAt: "2026-10-03T14:10:19.000Z",
} as const satisfies WorldSkill
