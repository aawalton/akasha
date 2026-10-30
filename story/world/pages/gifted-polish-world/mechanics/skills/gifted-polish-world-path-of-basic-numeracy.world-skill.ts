import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedPolishWorldPathOfBasicNumeracy = {
  id: "01a18e17-127d-7768-b87c-4e6e7301b801",
  type: "page-type/world-skill",
  slug: "gifted-polish-world-path-of-basic-numeracy",
  title: "Path of Basic Numeracy",
  world: "world/gifted-polish-world",
  abilityKind: "world-ability-kind/gifted-polish-world-path",
  tierSteps: [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  description: "A Basic Path walked by counting and reckoning sums.",
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies WorldSkill
