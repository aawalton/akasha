import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tradeSpikeSulfur = {
  id: "01a0657d-0316-7bb8-acdc-61ebd7d494a4",
  type: "page-type/world-skill",
  slug: "trade-spike-sulfur",
  title: "Trade Spike: Sulfur",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
