import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const unitToughSkin = {
  id: "01a0657d-031f-7d5a-8a37-a31fc6733205",
  type: "world-skill",
  slug: "unit-tough-skin",
  title: "Unit: Tough Skin",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
