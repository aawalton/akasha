import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const ottawaTreaty = {
  id: "019dbb6d-fa11-7b4b-b76e-672546d9c0af",
  type: "page-type/ctw-achievement",
  slug: "ottawa-treaty",
  title: "Ottawa Treaty",
  scope: "team",
  metric: "team_donation_milestone",
  threshold: 100,
  description:
    "The 1997 Ottawa Treaty prohibits the use, stockpiling, production, and transfer of anti-personnel mines. 164 states have joined. It was the fastest-negotiated disarmament agreement in history, driven by a coalition of NGOs that won the 1997 Nobel Peace Prize.",
  createdAt: "2026-04-23T17:40:40.081Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
