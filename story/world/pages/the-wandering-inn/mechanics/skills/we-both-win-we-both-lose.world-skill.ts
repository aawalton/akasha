import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const weBothWinWeBothLose = {
  id: "01a0657d-032c-7928-9de3-ef4254283c6f",
  type: "page-type/world-skill",
  slug: "we-both-win-we-both-lose",
  title: "We Both Win, We Both Lose",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
