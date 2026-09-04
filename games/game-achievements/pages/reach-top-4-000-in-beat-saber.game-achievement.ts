import type { GameAchievement } from "../game-achievement.page-type.ts"

export const reachTop4000InBeatSaber = {
  id: "01a06808-8818-7013-825f-b32e55f255ea",
  pageTypeSlug: "game-achievement",
  slug: "reach-top-4-000-in-beat-saber",
  title: "Reach Top 4,000 in Beat Saber",
  partOfSlugs: ["beat-saber"],
  position: -4000,
  ownLength: 1869225,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies GameAchievement
