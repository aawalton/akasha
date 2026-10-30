import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedPolishWorldPathOfWillpower = {
  id: "01a18e17-127d-79a0-b8ea-8d1c463fb5e8",
  type: "page-type/world-skill",
  slug: "gifted-polish-world-path-of-willpower",
  title: "Path of Willpower",
  world: "world/gifted-polish-world",
  abilityKind: "world-ability-kind/gifted-polish-world-path",
  tierSteps: [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  description: "A Basic Path walked by forcing on against what the body wants.",
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies WorldSkill
