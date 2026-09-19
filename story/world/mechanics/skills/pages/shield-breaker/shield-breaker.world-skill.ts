import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shieldBreaker = {
  id: "01a0657d-02c0-7766-9ec3-2a26cadc7d41",
  type: "page-type/world-skill",
  slug: "shield-breaker",
  title: "Shield Breaker",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
