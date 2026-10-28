import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pathsProbeWorldSwordplay = {
  id: "01a18008-7533-7c4a-bba6-410c1ef90a19",
  type: "page-type/world-skill",
  slug: "paths-probe-world-swordplay",
  title: "Swordplay",
  world: "world/paths-probe-world",
  abilityKind: "world-ability-kind/paths-probe-world-path",
  tierSteps: [10, 25, 50, 100],
  description: "Skill with the sword: cut, thrust and guard.",
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:04:27.937Z",
} as const satisfies WorldSkill
