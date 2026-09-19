import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stonewallShield = {
  id: "01a0657d-02fa-7393-a281-79be726d9617",
  type: "page-type/world-skill",
  slug: "stonewall-shield",
  title: "Stonewall Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
