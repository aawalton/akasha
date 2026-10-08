import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const belowFiveThousand = {
  id: "019dbb6e-295b-729a-addc-95701753fb41",
  type: "page-type/ctw-achievement",
  slug: "below-five-thousand",
  title: "Below Five Thousand",
  scope: "global",
  metric: "global_marks",
  threshold: 1000000,
  description:
    "In recent years, recorded annual landmine and cluster munition casualties dropped below 5,000 for the first time since systematic tracking began — still 5,000 too many, but a historic low that proves sustained action works.",
  createdAt: "2026-04-23T17:40:52.187Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
