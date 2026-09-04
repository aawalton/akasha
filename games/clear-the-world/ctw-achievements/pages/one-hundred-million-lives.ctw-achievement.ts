import type { CtwAchievement } from "../ctw-achievement.page-type.ts"

export const oneHundredMillionLives = {
  id: "019dbb6e-1485-7687-aab2-305ec8c311ea",
  pageTypeSlug: "ctw-achievement",
  slug: "one-hundred-million-lives",
  title: "One Hundred Million Lives",
  scope: "global",
  metric: "global_cells_cleared",
  threshold: 1000000000000,
  description:
    "Over 100 million people worldwide live under daily threat from landmines and explosive remnants of war. One trillion cells cleared virtually — the real crisis is measured in patient, metre-by-metre progress.",
} as const satisfies CtwAchievement
