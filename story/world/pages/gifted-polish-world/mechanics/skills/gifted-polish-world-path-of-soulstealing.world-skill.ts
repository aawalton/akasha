import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const giftedPolishWorldPathOfSoulstealing = {
  id: "01a18e17-127d-7335-80f0-0298d87c549e",
  type: "page-type/world-skill",
  slug: "gifted-polish-world-path-of-soulstealing",
  title: "Path of Soulstealing",
  world: "world/gifted-polish-world",
  abilityKind: "world-ability-kind/gifted-polish-world-path",
  tierSteps: [10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000],
  description: "A Path walked by taking other souls into one's own.",
  createdAt: "2026-10-30T18:34:02.178Z",
  updatedAt: "2026-10-30T18:34:02.178Z",
} as const satisfies WorldSkill
