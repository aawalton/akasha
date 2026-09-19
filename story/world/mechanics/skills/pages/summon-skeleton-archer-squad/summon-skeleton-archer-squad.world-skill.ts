import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const summonSkeletonArcherSquad = {
  id: "01a0657d-02fe-7796-b5c4-f469e46dafbe",
  type: "page-type/world-skill",
  slug: "summon-skeleton-archer-squad",
  title: "Summon Skeleton Archer Squad",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
