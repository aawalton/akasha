import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedTrialWorldPathOfEavesdropping = {
  id: "01a18d10-93f1-7150-a48d-b8e3413626cf",
  type: "page-type/world-skill",
  slug: "gifted-trial-world-path-of-eavesdropping",
  title: "Path of Eavesdropping",
  world: "world/gifted-trial-world",
  abilityKind: "world-ability-kind/gifted-trial-world-path",
  tierSteps: [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  description: "A Basic Path walked by listening in on other people's talk.",
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies WorldSkill
