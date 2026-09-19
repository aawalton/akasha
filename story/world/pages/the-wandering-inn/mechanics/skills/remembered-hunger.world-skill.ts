import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rememberedHunger = {
  id: "01a0657d-02b0-7f82-8c43-51a81d1dc4ca",
  type: "page-type/world-skill",
  slug: "remembered-hunger",
  title: "Remembered Hunger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
