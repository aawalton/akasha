import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedPathOfWillpower = {
  id: "01a17edd-6b14-761c-af77-15a126b838e8",
  type: "page-type/world-skill",
  slug: "gifted-path-of-willpower",
  title: "Path of Willpower",
  world: "world/gifted",
  abilityKind: "world-ability-kind/gifted-path",
  tierSteps: [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  description: "A Basic Path walked by forcing on against what the body wants.",
  createdAt: "2026-10-27T19:36:42.513Z",
  updatedAt: "2026-10-28T00:46:32.325Z",
} as const satisfies WorldSkill
