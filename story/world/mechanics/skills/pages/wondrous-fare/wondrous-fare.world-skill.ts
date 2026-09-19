import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wondrousFare = {
  id: "01a0657d-0337-76c6-925f-eaad5fa336d8",
  type: "page-type/world-skill",
  slug: "wondrous-fare",
  title: "Wondrous Fare",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
