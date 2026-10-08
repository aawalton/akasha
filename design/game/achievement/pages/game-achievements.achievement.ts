import type { Achievement } from "akasha/design/game/achievement/achievement.page-type.types.ts"

export const gameAchievements = {
  id: "01a06808-8818-7001-b885-feb286d7843a",
  type: "page-type/achievement",
  slug: "game-achievements",
  title: "Game Achievements",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
  createdAt: "2026-09-03T16:09:44.728Z",
  updatedAt: "2026-09-15T15:43:56.000Z",
} as const satisfies Achievement
