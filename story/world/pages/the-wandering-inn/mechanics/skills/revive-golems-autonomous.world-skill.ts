import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reviveGolemsAutonomous = {
  id: "01a0657d-02b2-7341-aac2-9da76ec2c250",
  type: "page-type/world-skill",
  slug: "revive-golems-autonomous",
  title: "Revive Golems (Autonomous)",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
