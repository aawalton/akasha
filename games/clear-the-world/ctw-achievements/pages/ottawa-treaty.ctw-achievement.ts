import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const ottawaTreaty = {
  id: "019dbb6d-fa11-7b4b-b76e-672546d9c0af",
  pageTypeSlug: "ctw-achievement",
  slug: "ottawa-treaty",
  title: "Ottawa Treaty",
  scope: "team",
  metric: "team_donation_milestone",
  threshold: 100,
  description:
    "The 1997 Ottawa Treaty prohibits the use, stockpiling, production, and transfer of anti-personnel mines. 164 states have joined. It was the fastest-negotiated disarmament agreement in history, driven by a coalition of NGOs that won the 1997 Nobel Peace Prize.",
} as const satisfies CtwAchievement
