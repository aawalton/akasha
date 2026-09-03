import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const explosiveOrdnanceDisposal = {
  id: "019dbb6d-9a33-773f-bc6b-ec2174b215fd",
  pageTypeSlug: "ctw-achievement",
  slug: "explosive-ordnance-disposal",
  title: "Explosive Ordnance Disposal",
  scope: "profile",
  metric: "session_marks_zero_false_zero_craters",
  threshold: 50,
  description:
    "EOD technicians identify, render safe, and destroy individual items of unexploded ordnance. Unlike area clearance, EOD demands a complete picture of each item — its type, fuze state, and position — before any action is taken.",
} as const satisfies CtwAchievement
