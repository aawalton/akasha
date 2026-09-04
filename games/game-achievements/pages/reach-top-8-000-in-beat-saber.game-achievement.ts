import type { GameAchievement } from "../game-achievement.page-type.ts"

export const reachTop8000InBeatSaber = {
  id: "01a06808-8818-7017-b1ed-debb9e3eada1",
  pageTypeSlug: "game-achievement",
  slug: "reach-top-8-000-in-beat-saber",
  title: "Reach Top 8,000 in Beat Saber",
  partOfSlugs: ["beat-saber"],
  position: -8000,
  ownLength: 1388475,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies GameAchievement
