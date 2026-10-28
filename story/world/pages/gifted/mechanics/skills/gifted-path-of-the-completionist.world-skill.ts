import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedPathOfTheCompletionist = {
  id: "01a17edd-6b14-7415-bdcb-17cae3d65080",
  type: "page-type/world-skill",
  slug: "gifted-path-of-the-completionist",
  title: "Path of the Completionist",
  world: "world/gifted",
  abilityKind: "world-ability-kind/gifted-path",
  tierSteps: [10, 50, 200, 500, 1000],
  description: "An Advanced Path walked by completing other Paths.",
  createdAt: "2026-10-27T19:36:42.513Z",
  updatedAt: "2026-10-28T14:21:44.538Z",
} as const satisfies WorldSkill
