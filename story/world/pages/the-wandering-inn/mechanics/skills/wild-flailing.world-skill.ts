import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wildFlailing = {
  id: "01a0657d-032e-74de-9c82-0294b6b2e3d9",
  type: "page-type/world-skill",
  slug: "wild-flailing",
  title: "Wild Flailing",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
