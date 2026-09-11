import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const outOfSeasonCrops = {
  id: "01a0657d-027f-7e13-b9ba-634a27df8d1e",
  type: "world-skill",
  slug: "out-of-season-crops",
  title: "Out of Season Crops",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
