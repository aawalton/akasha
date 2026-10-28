import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pathsProbeWorldLockpicking = {
  id: "01a18008-7533-780f-b4e7-02ff18bd7615",
  type: "page-type/world-skill",
  slug: "paths-probe-world-lockpicking",
  title: "Lockpicking",
  world: "world/paths-probe-world",
  abilityKind: "world-ability-kind/paths-probe-world-path",
  tierSteps: [10, 25, 50, 100],
  description: "Opening a lock without its key.",
  createdAt: "2026-10-28T01:03:22.622Z",
  updatedAt: "2026-10-28T01:04:27.937Z",
} as const satisfies WorldSkill
