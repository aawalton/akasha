import type { OutcomeTier } from "akasha/story/world/mechanics/checks/outcome-tiers/outcome-tier.page-type.types.ts"

export const criticalSuccess = {
  id: "01a17eee-ffa5-7a70-aa41-89fdd7aee2c4",
  type: "page-type/outcome-tier",
  slug: "critical-success",
  title: "Critical Success",
  scoreFloor: 85,
  succeeds: true,
  writerInstruction: "It works amazingly, in an awesome way.",
  createdAt: "2026-10-27T19:55:54.659Z",
  updatedAt: "2026-10-27T19:55:54.659Z",
} as const satisfies OutcomeTier
