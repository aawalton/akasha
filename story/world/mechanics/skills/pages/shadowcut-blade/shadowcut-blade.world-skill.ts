import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const shadowcutBlade = {
  id: "01a0657d-02bf-73ad-947d-a6ecf1b57070",
  type: "page-type/world-skill",
  slug: "shadowcut-blade",
  title: "Shadowcut Blade",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
