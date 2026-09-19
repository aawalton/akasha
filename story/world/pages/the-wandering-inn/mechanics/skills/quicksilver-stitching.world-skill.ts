import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const quicksilverStitching = {
  id: "01a0657d-029c-7637-8786-ae12ce549a6e",
  type: "page-type/world-skill",
  slug: "quicksilver-stitching",
  title: "Quicksilver Stitching",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
