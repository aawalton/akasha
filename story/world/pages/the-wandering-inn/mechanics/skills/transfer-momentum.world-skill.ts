import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const transferMomentum = {
  id: "01a0657d-0316-7109-a313-e213a337d1a3",
  type: "page-type/world-skill",
  slug: "transfer-momentum",
  title: "Transfer Momentum",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
