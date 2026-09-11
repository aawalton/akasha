import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const shipSBeacon = {
  id: "01a0657d-02c0-7c99-8109-6136f4f6095e",
  type: "world-skill",
  slug: "ship-s-beacon",
  title: "Ship’s Beacon",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
