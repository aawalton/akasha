import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const noOverlaps = {
  id: "01a0657d-027b-7d92-b17a-829912a59d9c",
  type: "world-skill",
  slug: "no-overlaps",
  title: "No Overlaps",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
