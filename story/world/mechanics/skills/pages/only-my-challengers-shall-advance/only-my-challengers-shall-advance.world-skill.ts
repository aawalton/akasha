import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const onlyMyChallengersShallAdvance = {
  id: "01a0657d-027c-70d2-9792-249f478396bd",
  type: "page-type/world-skill",
  slug: "only-my-challengers-shall-advance",
  title: "Only my Challengers Shall Advance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
