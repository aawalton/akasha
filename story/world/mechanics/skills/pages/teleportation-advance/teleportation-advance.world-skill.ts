import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const teleportationAdvance = {
  id: "01a0657d-0311-7318-839b-6f4c79dbf9e2",
  type: "page-type/world-skill",
  slug: "teleportation-advance",
  title: "Teleportation Advance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
