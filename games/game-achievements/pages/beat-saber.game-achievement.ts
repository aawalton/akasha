import type { GameAchievement } from "../game-achievement.page-type.ts"

export const beatSaber = {
  id: "01a06808-8818-7000-ba32-ad6dded3d4ee",
  pageTypeSlug: "game-achievement",
  type: "game-achievement",
  slug: "beat-saber",
  title: "Beat Saber",
  partOfCollections: ["game-achievements"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "in-progress",
  rank: "A",
} as const satisfies GameAchievement
