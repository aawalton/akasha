import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fairweatherHold = {
  id: "01a10218-e04a-7472-9977-710555456f98",
  type: "page-type/world-skill",
  slug: "fairweather-hold",
  title: "Hold",
  world: "world/fairweather",
  description: "An Enthraller skill that holds a person fast where they are.",
} as const satisfies WorldSkill
