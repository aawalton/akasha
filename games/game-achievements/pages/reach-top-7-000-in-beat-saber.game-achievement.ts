import type { GameAchievement } from "../game-achievement.page-type.ts"

export const reachTop7000InBeatSaber = {
  id: "01a06808-8818-7016-bfeb-627c13ffda50",
  pageTypeSlug: "game-achievement",
  slug: "reach-top-7-000-in-beat-saber",
  title: "Reach Top 7,000 in Beat Saber",
  partOfSlugs: ["beat-saber"],
  position: -7000,
  ownLength: 1482425,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies GameAchievement
