import type { GameAchievement } from "../game-achievement.page-type.ts"

export const reachTop5000InBeatSaber = {
  id: "01a06808-8818-7014-a571-0a7642b6fa16",
  pageTypeSlug: "game-achievement",
  slug: "reach-top-5-000-in-beat-saber",
  title: "Reach Top 5,000 in Beat Saber",
  partOfSlugs: ["beat-saber"],
  position: -5000,
  ownLength: 1873850,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies GameAchievement
