import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const theTowerSmithing = {
  id: "01a0de36-e68e-7c6d-a5d0-8ec2fa187d10",
  type: "page-type/world-skill",
  slug: "the-tower-smithing",
  title: "Smithing",
  world: "world/personas",
} as const satisfies WorldSkill
