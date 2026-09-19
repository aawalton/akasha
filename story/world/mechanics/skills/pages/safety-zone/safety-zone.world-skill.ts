import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const safetyZone = {
  id: "01a0657d-02b7-7874-85f7-2a1bf07df6b4",
  type: "page-type/world-skill",
  slug: "safety-zone",
  title: "Safety Zone",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
