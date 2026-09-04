import type { GameAchievement } from "../game-achievement.page-type.ts"

export const reachTop3000InBeatSaber = {
  id: "01a06808-8818-7012-9f49-abca9e6d2b33",
  pageTypeSlug: "game-achievement",
  slug: "reach-top-3-000-in-beat-saber",
  title: "Reach Top 3,000 in Beat Saber",
  partOfSlugs: ["beat-saber"],
  position: -3000,
  ownLength: 2440800,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies GameAchievement
