import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const mineFree = {
  id: "019dbb6d-b6c3-72fa-a5c2-928ce1aaf4e1",
  type: "page-type/ctw-achievement",
  slug: "mine-free",
  title: "Mine-Free",
  scope: "profile",
  metric: "cumulative_flood_fill",
  threshold: 1000000,
  description:
    "100 hectares is roughly the annual clearance output of a mid-sized HALO country program. HALO cleared 171 hectares across all of Sri Lanka in one financial year. Globally, a record 237 km² was cleared in 2023 — requiring every major demining organization on Earth working simultaneously.",
  createdAt: "2026-04-23T17:40:22.851Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
