import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const luckyRound = {
  id: "01a0657d-0241-7917-a351-4310ed772e78",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "lucky-round",
  title: "Lucky Round",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
