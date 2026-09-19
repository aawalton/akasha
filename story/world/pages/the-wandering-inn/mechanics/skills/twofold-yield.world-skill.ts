import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const twofoldYield = {
  id: "01a0657d-031e-763b-bc34-d072938bed0d",
  type: "page-type/world-skill",
  slug: "twofold-yield",
  title: "Twofold Yield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
