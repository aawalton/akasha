import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveHonorGuard = {
  id: "01a0e9f0-3dfb-78f7-b4b2-a751ac4875a9",
  type: "page-type/world-mechanic",
  slug: "super-supportive-honor-guard",
  title: "Honor guard",
  world: "world/super-supportive",
  description: "A dedicated superhuman who follows a new S- or A-rank for their first ninety days.",
} as const satisfies WorldMechanic
