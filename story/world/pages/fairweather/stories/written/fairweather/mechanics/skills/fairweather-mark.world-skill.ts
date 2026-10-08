import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherMark = {
  id: "01a1021a-73ab-7ec9-81f9-8ab944553b5e",
  type: "page-type/world-skill",
  slug: "fairweather-mark",
  title: "Mark",
  world: "world/fairweather",
  description: "An Enthraller skill that sets the caster's mark on a person, to be known by it.",
  createdAt: "2026-10-03T14:10:50.411Z",
  updatedAt: "2026-10-03T14:10:58.000Z",
} as const satisfies WorldSkill
