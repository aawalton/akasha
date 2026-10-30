import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedPolishWorldPathOfEavesdropping = {
  id: "01a18e17-127d-712b-9d3f-f6ae60282b45",
  type: "page-type/world-skill",
  slug: "gifted-polish-world-path-of-eavesdropping",
  title: "Path of Eavesdropping",
  world: "world/gifted-polish-world",
  abilityKind: "world-ability-kind/gifted-polish-world-path",
  tierSteps: [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  description: "A Basic Path walked by listening in on other people's talk.",
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies WorldSkill
