import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const delayedReaction = {
  id: "01a06575-9802-7f1d-99eb-740e8f9b983d",
  type: "world-skill",
  slug: "delayed-reaction",
  title: "Delayed Reaction",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
