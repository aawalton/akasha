import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pathsProbeWorldSpark = {
  id: "01a18008-7533-74ee-a735-4f5c0bf40b4d",
  type: "page-type/world-skill",
  slug: "paths-probe-world-spark",
  title: "Spark",
  world: "world/paths-probe-world",
  abilityKind: "world-ability-kind/paths-probe-world-path",
  tierSteps: [10, 25, 50, 100],
  description: "A small flash of light and heat from the fingertips.",
  manaCost: 1,
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:04:27.937Z",
} as const satisfies WorldSkill
