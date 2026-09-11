import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const magicFreeze = {
  id: "01a0657d-0241-7313-8a90-0f701323f405",
  type: "world-skill",
  slug: "magic-freeze",
  title: "Magic, Freeze",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
