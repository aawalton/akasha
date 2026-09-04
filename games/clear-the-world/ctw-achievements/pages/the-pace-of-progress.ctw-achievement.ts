import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const thePaceOfProgress = {
  id: "019dbb6e-1ef7-7b4c-873d-045e5ae195a7",
  pageTypeSlug: "ctw-achievement",
  slug: "the-pace-of-progress",
  title: "The Pace of Progress",
  scope: "global",
  metric: "global_zones_explored",
  threshold: 100000,
  description:
    "At current global funding and capacity, some estimates suggest over 1,100 years would be needed to clear all known contaminated land. Every increase in funding and technology shortens that timeline. This community is demonstrating the pace that urgency demands.",
} as const satisfies CtwAchievement
