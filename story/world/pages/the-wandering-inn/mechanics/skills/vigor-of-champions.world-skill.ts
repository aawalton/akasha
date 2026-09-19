import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const vigorOfChampions = {
  id: "01a0657d-0320-756c-ab55-98e46be99210",
  type: "page-type/world-skill",
  slug: "vigor-of-champions",
  title: "Vigor of Champions",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
