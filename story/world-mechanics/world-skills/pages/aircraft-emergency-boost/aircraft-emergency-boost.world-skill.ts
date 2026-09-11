import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const aircraftEmergencyBoost = {
  id: "01a06575-97ea-728c-a011-c17d597d7987",
  type: "world-skill",
  slug: "aircraft-emergency-boost",
  title: "Aircraft: Emergency Boost",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
