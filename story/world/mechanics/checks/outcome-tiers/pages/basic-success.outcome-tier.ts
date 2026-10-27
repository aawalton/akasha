import type { OutcomeTier } from "akasha/story/world/mechanics/checks/outcome-tiers/outcome-tier.page-type.types.ts"

export const basicSuccess = {
  id: "01a17eee-ffa4-7021-88ca-fb3a9b85b1a3",
  type: "page-type/outcome-tier",
  slug: "basic-success",
  title: "Basic Success",
  scoreFloor: 20,
  succeeds: true,
  writerInstruction: "It works.",
  createdAt: "2026-10-27T19:55:54.659Z",
  updatedAt: "2026-10-27T19:55:54.659Z",
} as const satisfies OutcomeTier
