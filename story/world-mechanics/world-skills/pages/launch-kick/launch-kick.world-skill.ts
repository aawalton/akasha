import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const launchKick = {
  id: "01a06575-9822-7dd5-a1c2-191ed18900f5",
  type: "world-skill",
  slug: "launch-kick",
  title: "Launch Kick",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
