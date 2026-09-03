import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const clusterRemnant = {
  id: "019dbb6d-8ad5-7962-b2e1-ff2b3c020382",
  pageTypeSlug: "ctw-achievement",
  slug: "cluster-remnant",
  title: "Cluster Remnant",
  scope: "profile",
  metric: "lifetime_marks",
  threshold: 7500,
  description:
    "Cluster munitions release dozens to hundreds of submunitions; failure rates of 5–30% leave fields of unexploded bomblets. 270 million submunitions were dropped on Laos between 1964 and 1973 — roughly 80 million failed to detonate and remain a daily hazard.",
} as const satisfies CtwAchievement
