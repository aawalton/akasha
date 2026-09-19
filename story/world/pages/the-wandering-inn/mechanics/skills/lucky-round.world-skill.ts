import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const luckyRound = {
  id: "01a0657d-0241-7917-a351-4310ed772e78",
  type: "page-type/world-skill",
  slug: "lucky-round",
  title: "Lucky Round",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
