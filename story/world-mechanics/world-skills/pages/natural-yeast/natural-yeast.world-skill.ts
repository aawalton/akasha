import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const naturalYeast = {
  id: "01a0657d-027a-762f-b03e-9d5e18dc3128",
  type: "world-skill",
  slug: "natural-yeast",
  title: "Natural Yeast",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
