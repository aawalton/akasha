import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const earmarkedFunds = {
  id: "01a06575-9806-7ab8-b656-51fdd591cb86",
  type: "page-type/world-skill",
  slug: "earmarked-funds",
  title: "Earmarked Funds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
