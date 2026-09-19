import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const minotaurPunch = {
  id: "01a0657d-024d-7bf0-96f1-c9ec0f602e19",
  type: "page-type/world-skill",
  slug: "minotaur-punch",
  title: "Minotaur Punch",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["power-strike"],
  references: "jsonl",
} as const satisfies WorldSkill
