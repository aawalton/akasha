import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectRecallMedicine = {
  id: "01a0657d-028f-73ed-8d2d-ba37ac81ef8c",
  type: "page-type/world-skill",
  slug: "perfect-recall-medicine",
  title: "Perfect Recall (Medicine)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
