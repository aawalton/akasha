import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const aircraftEmergencyBoost = {
  id: "01a06575-97ea-728c-a011-c17d597d7987",
  type: "page-type/world-skill",
  slug: "aircraft-emergency-boost",
  title: "Aircraft: Emergency Boost",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.554Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
