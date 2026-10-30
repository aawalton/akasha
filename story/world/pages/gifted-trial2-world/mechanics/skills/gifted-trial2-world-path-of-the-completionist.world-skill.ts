import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedTrial2WorldPathOfTheCompletionist = {
  id: "01a18dab-06cc-7f86-b266-c0393d3e92b3",
  type: "page-type/world-skill",
  slug: "gifted-trial2-world-path-of-the-completionist",
  title: "Path of the Completionist",
  world: "world/gifted-trial2-world",
  abilityKind: "world-ability-kind/gifted-trial2-world-path",
  tierSteps: [10, 50, 200, 500, 1000],
  description: "An Advanced Path walked by completing other Paths.",
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies WorldSkill
