import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const longStep = {
  id: "01a0657d-0240-7bd5-bafe-fee5c0a0c6bc",
  type: "page-type/world-skill",
  slug: "long-step",
  title: "Long Step",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
