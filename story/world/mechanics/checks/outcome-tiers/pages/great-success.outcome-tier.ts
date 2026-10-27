import type { OutcomeTier } from "akasha/story/world/mechanics/checks/outcome-tiers/outcome-tier.page-type.types.ts"

export const greatSuccess = {
  id: "01a17eee-ffa5-728a-a3b2-ac4952d831d8",
  type: "page-type/outcome-tier",
  slug: "great-success",
  title: "Great Success",
  scoreFloor: 60,
  succeeds: true,
  writerInstruction: "It works very well.",
  createdAt: "2026-10-27T19:55:54.659Z",
  updatedAt: "2026-10-27T19:55:54.659Z",
} as const satisfies OutcomeTier
