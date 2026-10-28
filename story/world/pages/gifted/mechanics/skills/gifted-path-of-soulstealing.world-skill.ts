import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedPathOfSoulstealing = {
  id: "01a17edd-6b14-716d-9086-c49e87223c28",
  type: "page-type/world-skill",
  slug: "gifted-path-of-soulstealing",
  title: "Path of Soulstealing",
  world: "world/gifted",
  abilityKind: "world-ability-kind/gifted-path",
  tierSteps: [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  description: "A Path walked by taking other souls into one's own.",
  createdAt: "2026-10-27T19:36:42.513Z",
  updatedAt: "2026-10-28T00:46:32.325Z",
} as const satisfies WorldSkill
