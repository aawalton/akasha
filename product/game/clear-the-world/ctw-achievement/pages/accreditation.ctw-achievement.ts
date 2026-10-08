import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const accreditation = {
  id: "019dbb6d-f76d-7dd4-a2dc-413b01ba36ec",
  type: "page-type/ctw-achievement",
  slug: "accreditation",
  title: "Accreditation",
  scope: "team",
  metric: "team_crater_rate",
  threshold: 5000000,
  description:
    "Demining organisations must earn accreditation from each country’s National Authority before they can operate. The process evaluates equipment, training, standard operating procedures, and quality management systems.",
  createdAt: "2026-04-23T17:40:39.405Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
