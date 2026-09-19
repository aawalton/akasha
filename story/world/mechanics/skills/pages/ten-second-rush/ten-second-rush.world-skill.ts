import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const tenSecondRush = {
  id: "01a0657d-0311-7c89-8819-ee57dc716373",
  type: "page-type/world-skill",
  slug: "ten-second-rush",
  title: "Ten Second Rush",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
