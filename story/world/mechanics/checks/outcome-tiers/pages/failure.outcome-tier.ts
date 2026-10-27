import type { OutcomeTier } from "akasha/story/world/mechanics/checks/outcome-tiers/outcome-tier.page-type.types.ts"

export const failure = {
  id: "01a17eee-ffa5-73fe-aa35-e6a31c6d52f9",
  type: "page-type/outcome-tier",
  slug: "failure",
  title: "Failure",
  scoreFloor: -45,
  succeeds: false,
  writerInstruction: "They try, and it fails.",
  createdAt: "2026-10-27T19:55:54.659Z",
  updatedAt: "2026-10-27T19:55:54.659Z",
} as const satisfies OutcomeTier
