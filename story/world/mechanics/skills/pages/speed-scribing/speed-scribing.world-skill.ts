import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const speedScribing = {
  id: "01a0657d-02ed-73bb-a671-1d928ca02be0",
  type: "page-type/world-skill",
  slug: "speed-scribing",
  title: "Speed Scribing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
