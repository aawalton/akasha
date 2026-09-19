import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const loweredGuard = {
  id: "01a0657d-0241-77ee-a675-e289cdb8983b",
  type: "page-type/world-skill",
  slug: "lowered-guard",
  title: "Lowered Guard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
