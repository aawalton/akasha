import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const forcedRemoval = {
  id: "01a06575-980f-7358-80b4-03435859ffcc",
  type: "world-skill",
  slug: "forced-removal",
  title: "Forced Removal",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
