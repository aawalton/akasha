import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedTrial2WorldPathOfSoulstealing = {
  id: "01a18dab-06cc-71c9-bede-9b61582cb5ed",
  type: "page-type/world-skill",
  slug: "gifted-trial2-world-path-of-soulstealing",
  title: "Path of Soulstealing",
  world: "world/gifted-trial2-world",
  abilityKind: "world-ability-kind/gifted-trial2-world-path",
  tierSteps: [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  description: "A Path walked by taking other souls into one's own.",
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies WorldSkill
