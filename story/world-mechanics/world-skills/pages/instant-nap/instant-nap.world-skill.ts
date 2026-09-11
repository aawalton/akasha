import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const instantNap = {
  id: "01a06575-981f-785b-8f0e-97bc3e6353f9",
  type: "world-skill",
  slug: "instant-nap",
  title: "Instant Nap",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
