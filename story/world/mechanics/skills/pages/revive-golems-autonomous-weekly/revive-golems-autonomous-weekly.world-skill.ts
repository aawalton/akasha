import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reviveGolemsAutonomousWeekly = {
  id: "01a0657d-02b2-7629-964e-0127c6841b88",
  type: "page-type/world-skill",
  slug: "revive-golems-autonomous-weekly",
  title: "Revive Golems (Autonomous, Weekly)",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
