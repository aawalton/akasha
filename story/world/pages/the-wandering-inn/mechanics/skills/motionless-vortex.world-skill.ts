import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const motionlessVortex = {
  id: "01a0657d-026f-72c3-9caa-3a15b5756dd6",
  type: "page-type/world-skill",
  slug: "motionless-vortex",
  title: "Motionless Vortex",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
