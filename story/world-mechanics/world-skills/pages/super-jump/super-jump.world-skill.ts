import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const superJump = {
  id: "01a0657d-0302-71e2-ba25-bc9807af6998",
  type: "world-skill",
  slug: "super-jump",
  title: "Super Jump",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
