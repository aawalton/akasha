import type { Achievement } from "akasha/design/games/achievements/achievement.page-type.types.ts"

export const gameAchievements = {
  id: "01a06808-8818-7001-b885-feb286d7843a",
  type: "achievement",
  slug: "game-achievements",
  title: "Game Achievements",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-applicable",
} as const satisfies Achievement
