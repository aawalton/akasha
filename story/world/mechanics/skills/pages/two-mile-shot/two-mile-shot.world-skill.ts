import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const twoMileShot = {
  id: "01a0657d-0317-7e1f-bc4d-6e7018207393",
  type: "page-type/world-skill",
  slug: "two-mile-shot",
  title: "Two Mile Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
