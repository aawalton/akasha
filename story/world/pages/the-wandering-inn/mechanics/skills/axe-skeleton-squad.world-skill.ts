import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const axeSkeletonSquad = {
  id: "01a06575-97f2-7648-9d8f-c3a08f7220d8",
  type: "page-type/world-skill",
  slug: "axe-skeleton-squad",
  title: "Axe Skeleton Squad",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
