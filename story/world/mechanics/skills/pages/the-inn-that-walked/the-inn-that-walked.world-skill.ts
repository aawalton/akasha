import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const theInnThatWalked = {
  id: "01a0657d-0312-7e2b-8e8e-33e8b027d32f",
  type: "page-type/world-skill",
  slug: "the-inn-that-walked",
  title: "The Inn That Walked",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
