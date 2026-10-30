import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedPolishWorldPathOfTheCompletionist = {
  id: "01a18e17-127d-7807-b27d-51a7867f5912",
  type: "page-type/world-skill",
  slug: "gifted-polish-world-path-of-the-completionist",
  title: "Path of the Completionist",
  world: "world/gifted-polish-world",
  abilityKind: "world-ability-kind/gifted-polish-world-path",
  tierSteps: [10, 50, 200, 500, 1000],
  description: "An Advanced Path walked by completing other Paths.",
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies WorldSkill
