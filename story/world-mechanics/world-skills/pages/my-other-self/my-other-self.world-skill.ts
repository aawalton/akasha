import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const myOtherSelf = {
  id: "01a0657d-0270-74d0-8b3e-05344ca661a6",
  type: "world-skill",
  slug: "my-other-self",
  title: "My Other Self",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
