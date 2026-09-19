import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const calmMind = {
  id: "01a06575-97fa-7212-a8b9-6834ea2911ab",
  type: "page-type/world-skill",
  slug: "calm-mind",
  title: "Calm Mind",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
