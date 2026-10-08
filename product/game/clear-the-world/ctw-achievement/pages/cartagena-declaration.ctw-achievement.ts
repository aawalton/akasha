import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const cartagenaDeclaration = {
  id: "019dbb6e-0243-78a0-9503-4ec2aedb9683",
  type: "page-type/ctw-achievement",
  slug: "cartagena-declaration",
  title: "Cartagena Declaration",
  scope: "team",
  metric: "team_donation_milestone",
  threshold: 10000,
  description:
    "The 2009 Cartagena Declaration reaffirmed that mine action is an obligation of international humanitarian law, not optional charity. It called on states to meet their treaty deadlines and fund clearance proportionally to their resources.",
  createdAt: "2026-04-23T17:40:42.179Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
