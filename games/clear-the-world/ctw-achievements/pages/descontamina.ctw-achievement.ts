import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const descontamina = {
  id: "019dbb6d-e5b2-7aad-98ab-21615b721f3a",
  pageTypeSlug: "ctw-achievement",
  slug: "descontamina",
  title: "Descontamina",
  scope: "team",
  metric: "team_zone_completions",
  threshold: 10,
  description:
    "Descontamina Colombia is the national coordination body that assigns municipalities to different clearance organisations and tracks progress. It coordinates both international NGOs and Humanicemos DM, the programme staffed by former combatants.",
} as const satisfies CtwAchievement
