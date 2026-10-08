import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const descontamina = {
  id: "019dbb6d-e5b2-7aad-98ab-21615b721f3a",
  type: "page-type/ctw-achievement",
  slug: "descontamina",
  title: "Descontamina",
  scope: "team",
  metric: "team_zone_completions",
  threshold: 10,
  description:
    "Descontamina Colombia is the national coordination body that assigns municipalities to different clearance organisations and tracks progress. It coordinates both international NGOs and Humanicemos DM, the programme staffed by former combatants.",
  createdAt: "2026-04-23T17:40:34.866Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
