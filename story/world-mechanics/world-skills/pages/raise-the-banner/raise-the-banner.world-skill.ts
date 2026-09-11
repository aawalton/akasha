import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const raiseTheBanner = {
  id: "01a0657d-029c-7d7a-aa91-77ee4c490592",
  type: "world-skill",
  slug: "raise-the-banner",
  title: "Raise the Banner",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
