import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedTrial2WorldPathOfEavesdropping = {
  id: "01a18dab-06cc-7de5-9130-fd87d1bf8e25",
  type: "page-type/world-skill",
  slug: "gifted-trial2-world-path-of-eavesdropping",
  title: "Path of Eavesdropping",
  world: "world/gifted-trial2-world",
  abilityKind: "world-ability-kind/gifted-trial2-world-path",
  tierSteps: [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  description: "A Basic Path walked by listening in on other people's talk.",
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies WorldSkill
