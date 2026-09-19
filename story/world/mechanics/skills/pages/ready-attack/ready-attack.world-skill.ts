import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const readyAttack = {
  id: "01a0657d-02a5-7161-aa1f-f6d3f61af1ca",
  type: "page-type/world-skill",
  slug: "ready-attack",
  title: "Ready Attack",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
