import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const destinationFastTravel = {
  id: "01a06575-9803-7d66-b704-5e7d8b811fc6",
  type: "page-type/world-skill",
  slug: "destination-fast-travel",
  title: "Destination: Fast Travel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
