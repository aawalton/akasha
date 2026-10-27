import type { OutcomeTier } from "akasha/story/world/mechanics/checks/outcome-tiers/outcome-tier.page-type.types.ts"

export const criticalFailure = {
  id: "01a17eee-ffa5-72c7-a4e9-38e72c2168f8",
  type: "page-type/outcome-tier",
  slug: "critical-failure",
  title: "Critical Failure",
  succeeds: false,
  writerInstruction:
    "It fails in a dramatic, catastrophic way, which may be an enemy's cleverness.",
  createdAt: "2026-10-27T19:55:54.659Z",
  updatedAt: "2026-10-27T19:55:54.659Z",
} as const satisfies OutcomeTier
