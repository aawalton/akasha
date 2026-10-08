import type { CtwAchievement } from "akasha/product/game/clear-the-world/ctw-achievement/ctw-achievement.page-type.types.ts"

export const oneHundredMillionLives = {
  id: "019dbb6e-1485-7687-aab2-305ec8c311ea",
  type: "page-type/ctw-achievement",
  slug: "one-hundred-million-lives",
  title: "One Hundred Million Lives",
  scope: "global",
  metric: "global_cells_cleared",
  threshold: 1000000000000,
  description:
    "Over 100 million people worldwide live under daily threat from landmines and explosive remnants of war. One trillion cells cleared virtually — the real crisis is measured in patient, metre-by-metre progress.",
  createdAt: "2026-04-23T17:40:46.853Z",
  updatedAt: "2026-09-15T16:31:54.000Z",
} as const satisfies CtwAchievement
