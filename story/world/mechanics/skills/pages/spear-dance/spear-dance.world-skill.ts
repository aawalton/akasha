import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spearDance = {
  id: "01a0657d-02ec-7f3f-9706-95a9c1ca0e93",
  type: "page-type/world-skill",
  slug: "spear-dance",
  title: "Spear Dance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
