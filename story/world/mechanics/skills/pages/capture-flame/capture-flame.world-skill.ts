import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const captureFlame = {
  id: "01a06575-97fa-7590-8a57-0b8152c320bc",
  type: "page-type/world-skill",
  slug: "capture-flame",
  title: "Capture Flame",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
