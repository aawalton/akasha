import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const quangTri = {
  id: "019dbb6d-7da3-73bf-bd74-c071a509c413",
  pageTypeSlug: "ctw-achievement",
  slug: "quang-tri",
  title: "Quang Tri",
  scope: "profile",
  metric: "lifetime_cells_cleared",
  threshold: 50000000,
  description:
    "Quang Tri received more ordnance per square metre than anywhere on Earth. Over 3,400 people have been killed by war-left explosives since 1975. At 2022 clearance rates, full clearance was still 12 years away.",
} as const satisfies CtwAchievement
