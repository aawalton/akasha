import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedTrial2WorldPathOfEndurance = {
  id: "01a18dab-06cc-7b14-ae92-ba7b64384c08",
  type: "page-type/world-skill",
  slug: "gifted-trial2-world-path-of-endurance",
  title: "Path of Endurance",
  world: "world/gifted-trial2-world",
  abilityKind: "world-ability-kind/gifted-trial2-world-path",
  tierSteps: [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  description: "A Basic Path walked by holding out against weariness.",
  createdAt: "2026-10-30T16:36:03.198Z",
  updatedAt: "2026-10-30T16:36:03.198Z",
} as const satisfies WorldSkill
