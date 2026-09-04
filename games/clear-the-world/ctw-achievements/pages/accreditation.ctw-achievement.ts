import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const accreditation = {
  id: "019dbb6d-f76d-7dd4-a2dc-413b01ba36ec",
  pageTypeSlug: "ctw-achievement",
  slug: "accreditation",
  title: "Accreditation",
  scope: "team",
  metric: "team_crater_rate",
  threshold: 5000000,
  description:
    "Demining organisations must earn accreditation from each country’s National Authority before they can operate. The process evaluates equipment, training, standard operating procedures, and quality management systems.",
} as const satisfies CtwAchievement
