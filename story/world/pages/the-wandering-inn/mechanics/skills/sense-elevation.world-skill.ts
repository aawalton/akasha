import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const senseElevation = {
  id: "01a0657d-02b9-7b20-afac-1a475b38ad2f",
  type: "page-type/world-skill",
  slug: "sense-elevation",
  title: "Sense Elevation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
