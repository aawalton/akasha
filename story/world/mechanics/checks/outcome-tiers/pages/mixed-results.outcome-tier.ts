import type { OutcomeTier } from "akasha/story/world/mechanics/checks/outcome-tiers/outcome-tier.page-type.types.ts"

export const mixedResults = {
  id: "01a17eee-ffa5-721d-a363-6d9285f2a3da",
  type: "page-type/outcome-tier",
  slug: "mixed-results",
  title: "Mixed Results",
  scoreFloor: 0,
  succeeds: true,
  writerInstruction: "It only partly works, and the result is mixed.",
  createdAt: "2026-10-27T19:55:54.659Z",
  updatedAt: "2026-10-27T19:55:54.659Z",
} as const satisfies OutcomeTier
