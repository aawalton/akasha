import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flyThroughWaterAsSky = {
  id: "01a06575-980f-70fa-8a09-630f875ca4d7",
  type: "page-type/world-skill",
  slug: "fly-through-water-as-sky",
  title: "Fly Through Water As Sky",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
