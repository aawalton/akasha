import type { GameAchievement } from "../game-achievement.page-type.ts"

export const reachTop10000InBeatSaber = {
  id: "01a06808-8818-700e-a318-6dfe998e7cd0",
  pageTypeSlug: "game-achievement",
  slug: "reach-top-10-000-in-beat-saber",
  title: "Reach Top 10,000 in Beat Saber",
  partOfSlugs: ["beat-saber"],
  position: -10000,
  ownLength: 1325175,
  ownProgress: 1325175,
  unitSlug: "words",
  status: "completed",
  rank: "A",
} as const satisfies GameAchievement
