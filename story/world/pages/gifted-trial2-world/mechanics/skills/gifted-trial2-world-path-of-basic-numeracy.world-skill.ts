import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedTrial2WorldPathOfBasicNumeracy = {
  id: "01a18dab-06cc-79f9-9a7a-da13cc00bc2e",
  type: "page-type/world-skill",
  slug: "gifted-trial2-world-path-of-basic-numeracy",
  title: "Path of Basic Numeracy",
  world: "world/gifted-trial2-world",
  abilityKind: "world-ability-kind/gifted-trial2-world-path",
  tierSteps: [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  description: "A Basic Path walked by counting and reckoning sums.",
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies WorldSkill
