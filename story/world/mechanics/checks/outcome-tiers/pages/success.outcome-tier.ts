import type { OutcomeTier } from "akasha/story/world/mechanics/checks/outcome-tiers/outcome-tier.page-type.types.ts"

export const success = {
  id: "01a17eee-ffa6-71c3-a0af-6ffe0ba6ef49",
  type: "page-type/outcome-tier",
  slug: "success",
  title: "Success",
  scoreFloor: 40,
  succeeds: true,
  color: "color/green",
  writerInstruction: "It works well.",
  createdAt: "2026-10-27T19:55:54.659Z",
  updatedAt: "2026-10-28T17:42:17.581Z",
} as const satisfies OutcomeTier
