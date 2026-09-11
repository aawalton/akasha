import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const followMyCommandWorm = {
  id: "01a06575-980f-71e4-8078-c77ca3a09eee",
  type: "world-skill",
  slug: "follow-my-command-worm",
  title: "Follow my Command, Worm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
