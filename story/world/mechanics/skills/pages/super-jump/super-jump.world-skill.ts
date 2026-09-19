import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const superJump = {
  id: "01a0657d-0302-71e2-ba25-bc9807af6998",
  type: "page-type/world-skill",
  slug: "super-jump",
  title: "Super Jump",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
