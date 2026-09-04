import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const cancelledLand = {
  id: "019dbb6d-d8d2-7dd0-981f-1a6851c0b732",
  pageTypeSlug: "ctw-achievement",
  slug: "cancelled-land",
  title: "Cancelled Land",
  scope: "team",
  metric: "team_marks",
  threshold: 25000,
  description:
    "In mine action, ‘cancelled land’ is area that was suspected of contamination but reclassified as safe after survey found no evidence of hazards. This releases land back to communities without full clearance — one of the most impactful outcomes of systematic marking.",
} as const satisfies CtwAchievement
