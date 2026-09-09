import type { GameAchievement } from "../game-achievement.page-type.ts"

export const reachTop9000InBeatSaber = {
  id: "01a06808-8818-7018-b3f0-225df0d3d8e3",
  pageTypeSlug: "game-achievement",
  type: "game-achievement",
  slug: "reach-top-9-000-in-beat-saber",
  title: "Reach Top 9,000 in Beat Saber",
  partOfCollections: ["beat-saber"],
  position: -9000,
  ownLength: 1380700,
  ownProgress: 1123889.8,
  unit: "words",
  status: "in-progress",
  rank: "A",
} as const satisfies GameAchievement
