import type { GameAchievement } from "../game-achievement.page-type.ts"

export const reachTop2000InBeatSaber = {
  id: "01a06808-8818-7011-b936-f564575a808c",
  pageTypeSlug: "game-achievement",
  slug: "reach-top-2-000-in-beat-saber",
  title: "Reach Top 2,000 in Beat Saber",
  partOfSlugs: ["beat-saber"],
  position: -2000,
  ownLength: 3149600,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies GameAchievement
