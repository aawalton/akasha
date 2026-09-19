import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const naturalConcealment = {
  id: "01a0657d-0271-7ec2-b727-38dadff40ed0",
  type: "page-type/world-skill",
  slug: "natural-concealment",
  title: "Natural Concealment",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
