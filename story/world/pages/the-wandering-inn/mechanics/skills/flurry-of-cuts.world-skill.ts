import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flurryOfCuts = {
  id: "01a06575-980f-7149-bbea-e5aa3671590c",
  type: "page-type/world-skill",
  slug: "flurry-of-cuts",
  title: "Flurry of Cuts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
