import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const belowFiveThousand = {
  id: "019dbb6e-295b-729a-addc-95701753fb41",
  pageTypeSlug: "ctw-achievement",
  slug: "below-five-thousand",
  title: "Below Five Thousand",
  scope: "global",
  metric: "global_marks",
  threshold: 1000000,
  description:
    "In recent years, recorded annual landmine and cluster munition casualties dropped below 5,000 for the first time since systematic tracking began — still 5,000 too many, but a historic low that proves sustained action works.",
} as const satisfies CtwAchievement
