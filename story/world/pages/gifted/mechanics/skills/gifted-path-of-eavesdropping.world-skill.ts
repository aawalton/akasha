import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedPathOfEavesdropping = {
  id: "01a17edd-6b13-770a-b89e-26873efda664",
  type: "page-type/world-skill",
  slug: "gifted-path-of-eavesdropping",
  title: "Path of Eavesdropping",
  world: "world/gifted",
  abilityKind: "world-ability-kind/gifted-path",
  tierSteps: [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  description: "A Basic Path walked by listening in on other people's talk.",
  createdAt: "2026-10-27T19:36:42.513Z",
  updatedAt: "2026-10-28T00:46:32.325Z",
} as const satisfies WorldSkill
