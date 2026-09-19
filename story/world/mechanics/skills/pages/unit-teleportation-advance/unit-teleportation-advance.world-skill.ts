import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unitTeleportationAdvance = {
  id: "01a0657d-031f-7a7d-ab33-9be9c633a8d9",
  type: "page-type/world-skill",
  slug: "unit-teleportation-advance",
  title: "Unit: Teleportation Advance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
