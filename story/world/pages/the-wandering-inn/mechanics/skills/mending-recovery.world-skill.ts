import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mendingRecovery = {
  id: "01a0657d-024c-7d8e-83ee-0d5f28ee510e",
  type: "page-type/world-skill",
  slug: "mending-recovery",
  title: "Mending Recovery",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
