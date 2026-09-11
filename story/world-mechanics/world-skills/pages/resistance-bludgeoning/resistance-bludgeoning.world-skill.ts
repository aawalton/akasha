import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const resistanceBludgeoning = {
  id: "01a0657d-02b1-7e28-bde8-44999cd6f3cf",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "resistance-bludgeoning",
  title: "Resistance: Bludgeoning",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
