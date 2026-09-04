import type { GameAchievement } from "../game-achievement.page-type.ts"

export const gameAchievements = {
  id: "01a06808-8818-7001-b885-feb286d7843a",
  pageTypeSlug: "game-achievement",
  slug: "game-achievements",
  title: "Game Achievements",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-applicable",
} as const satisfies GameAchievement
