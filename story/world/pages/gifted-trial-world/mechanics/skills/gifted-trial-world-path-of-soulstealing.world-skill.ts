import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedTrialWorldPathOfSoulstealing = {
  id: "01a18d10-93f1-7c88-9f46-e137d05bb233",
  type: "page-type/world-skill",
  slug: "gifted-trial-world-path-of-soulstealing",
  title: "Path of Soulstealing",
  world: "world/gifted-trial-world",
  abilityKind: "world-ability-kind/gifted-trial-world-path",
  tierSteps: [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  description: "A Path walked by taking other souls into one's own.",
  createdAt: "2026-10-30T13:47:19.494Z",
  updatedAt: "2026-10-30T13:47:19.494Z",
} as const satisfies WorldSkill
