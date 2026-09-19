import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const powerJump = {
  id: "01a0657d-0295-737a-890f-f31b7a666c4c",
  type: "page-type/world-skill",
  slug: "power-jump",
  title: "Power Jump",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
