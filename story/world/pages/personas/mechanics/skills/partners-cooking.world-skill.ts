import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const partnersCooking = {
  id: "01a0de4d-b8a8-7a12-8985-5a4a6ed0b5b0",
  type: "page-type/world-skill",
  slug: "partners-cooking",
  title: "Cooking",
  world: "world/personas",
} as const satisfies WorldSkill
