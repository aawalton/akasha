import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedTrialWorldPathOfTheCompletionist = {
  id: "01a18d10-93f1-794a-b32d-dab7ac9dda04",
  type: "page-type/world-skill",
  slug: "gifted-trial-world-path-of-the-completionist",
  title: "Path of the Completionist",
  world: "world/gifted-trial-world",
  abilityKind: "world-ability-kind/gifted-trial-world-path",
  tierSteps: [10, 50, 200, 500, 1000],
  description: "An Advanced Path walked by completing other Paths.",
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies WorldSkill
