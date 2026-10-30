import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedTrialWorldPathOfEndurance = {
  id: "01a18d10-93f1-7107-8d97-77445710edab",
  type: "page-type/world-skill",
  slug: "gifted-trial-world-path-of-endurance",
  title: "Path of Endurance",
  world: "world/gifted-trial-world",
  abilityKind: "world-ability-kind/gifted-trial-world-path",
  tierSteps: [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  description: "A Basic Path walked by holding out against weariness.",
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies WorldSkill
