import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const feathercatchRoll = {
  id: "01a06575-980c-75f5-91c6-ad461a787144",
  type: "page-type/world-skill",
  slug: "feathercatch-roll",
  title: "Feathercatch Roll",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
