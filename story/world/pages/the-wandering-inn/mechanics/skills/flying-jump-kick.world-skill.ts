import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flyingJumpKick = {
  id: "01a06575-980f-753d-a0c3-c08fae2ee35c",
  type: "page-type/world-skill",
  slug: "flying-jump-kick",
  title: "Flying Jump Kick",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
