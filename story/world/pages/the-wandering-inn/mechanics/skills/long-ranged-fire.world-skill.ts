import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const longRangedFire = {
  id: "01a0657d-0240-7cc7-ad91-81375c5ed9a4",
  type: "page-type/world-skill",
  slug: "long-ranged-fire",
  title: "Long-ranged Fire",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
