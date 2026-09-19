import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stillBlade = {
  id: "01a0657d-02fa-7a47-8599-e2d33c9c33bf",
  type: "page-type/world-skill",
  slug: "still-blade",
  title: "Still Blade",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
