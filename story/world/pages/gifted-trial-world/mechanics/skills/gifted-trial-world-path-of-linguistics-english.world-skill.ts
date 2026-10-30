import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedTrialWorldPathOfLinguisticsEnglish = {
  id: "01a18d10-93f1-7e85-9392-ff1bf484dd6e",
  type: "page-type/world-skill",
  slug: "gifted-trial-world-path-of-linguistics-english",
  title: "Path of Linguistics - English",
  world: "world/gifted-trial-world",
  abilityKind: "world-ability-kind/gifted-trial-world-path",
  tierSteps: [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  description: "A Basic Path walked by using the English tongue.",
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies WorldSkill
