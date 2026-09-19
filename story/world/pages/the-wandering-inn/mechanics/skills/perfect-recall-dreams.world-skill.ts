import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectRecallDreams = {
  id: "01a0657d-028f-7066-a01f-d543379491fb",
  type: "page-type/world-skill",
  slug: "perfect-recall-dreams",
  title: "Perfect Recall (Dreams)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
