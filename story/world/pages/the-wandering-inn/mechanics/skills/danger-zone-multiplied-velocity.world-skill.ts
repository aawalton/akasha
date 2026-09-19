import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dangerZoneMultipliedVelocity = {
  id: "01a06575-9800-758b-b2d7-7f815d88393a",
  type: "page-type/world-skill",
  slug: "danger-zone-multiplied-velocity",
  title: "Danger Zone: Multiplied Velocity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
