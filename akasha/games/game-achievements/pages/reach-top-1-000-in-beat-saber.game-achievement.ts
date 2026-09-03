import type { GameAchievement } from "../game-achievement.page-type.ts"

export const reachTop1000InBeatSaber = {
  id: "01a06808-8818-700d-be48-23d34b052669",
  pageTypeSlug: "game-achievement",
  slug: "reach-top-1-000-in-beat-saber",
  title: "Reach Top 1,000 in Beat Saber",
  partOfSlugs: ["beat-saber"],
  position: -1000,
  ownLength: 4108250,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies GameAchievement
