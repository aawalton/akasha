import type { GameAchievement } from "../game-achievement.page-type.ts"

export const beatSaber = {
  id: "01a06808-8818-7000-ba32-ad6dded3d4ee",
  pageTypeSlug: "game-achievement",
  slug: "beat-saber",
  title: "Beat Saber",
  partOfSlugs: ["game-achievements"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "in-progress",
  rank: "A",
} as const satisfies GameAchievement
