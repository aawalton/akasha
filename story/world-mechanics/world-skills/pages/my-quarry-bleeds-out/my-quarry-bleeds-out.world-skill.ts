import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const myQuarryBleedsOut = {
  id: "01a0657d-0270-7c6a-9353-ffdc3f2edc68",
  type: "world-skill",
  slug: "my-quarry-bleeds-out",
  title: "My Quarry Bleeds Out",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
