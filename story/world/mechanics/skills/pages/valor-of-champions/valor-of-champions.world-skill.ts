import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const valorOfChampions = {
  id: "01a0657d-0320-7d3b-a783-7aa431d57d1b",
  type: "page-type/world-skill",
  slug: "valor-of-champions",
  title: "Valor of Champions",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
