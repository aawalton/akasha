import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const whirlMyBlade = {
  id: "01a0657d-032d-7364-9447-e972d72c72ee",
  type: "page-type/world-skill",
  slug: "whirl-my-blade",
  title: "Whirl My Blade",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
