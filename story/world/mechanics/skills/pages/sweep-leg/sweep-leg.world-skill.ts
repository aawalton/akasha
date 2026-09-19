import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sweepLeg = {
  id: "01a0657d-0303-7fe8-a50d-4b8e6ead62db",
  type: "page-type/world-skill",
  slug: "sweep-leg",
  title: "Sweep Leg",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
