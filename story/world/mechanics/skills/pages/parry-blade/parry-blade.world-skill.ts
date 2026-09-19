import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const parryBlade = {
  id: "01a0657d-0286-78a2-b185-800f1aaf8ab9",
  type: "page-type/world-skill",
  slug: "parry-blade",
  title: "Parry Blade",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
