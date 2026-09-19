import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const endlessSpearFlurry = {
  id: "01a06575-9808-7e15-8a8f-94fc7655810a",
  type: "page-type/world-skill",
  slug: "endless-spear-flurry",
  title: "Endless Spear Flurry",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
