import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const foefinderSScan = {
  id: "01a06575-980f-715c-b054-92db11953a4f",
  type: "page-type/world-skill",
  slug: "foefinder-s-scan",
  title: "Foefinder’s Scan",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
