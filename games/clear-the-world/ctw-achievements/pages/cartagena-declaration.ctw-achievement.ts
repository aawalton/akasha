import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const cartagenaDeclaration = {
  id: "019dbb6e-0243-78a0-9503-4ec2aedb9683",
  pageTypeSlug: "ctw-achievement",
  slug: "cartagena-declaration",
  title: "Cartagena Declaration",
  scope: "team",
  metric: "team_donation_milestone",
  threshold: 10000,
  description:
    "The 2009 Cartagena Declaration reaffirmed that mine action is an obligation of international humanitarian law, not optional charity. It called on states to meet their treaty deadlines and fund clearance proportionally to their resources.",
} as const satisfies CtwAchievement
