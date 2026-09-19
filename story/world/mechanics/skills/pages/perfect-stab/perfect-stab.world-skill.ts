import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectStab = {
  id: "01a0657d-028f-7c3e-a0de-71e99d0fc835",
  type: "page-type/world-skill",
  slug: "perfect-stab",
  title: "Perfect Stab",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
