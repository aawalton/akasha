import type { Achievement } from "akasha/design/game/achievement/achievement.page-type.types.ts"

export const reachTop8000InBeatSaber = {
  id: "01a06808-8818-7017-b1ed-debb9e3eada1",
  type: "page-type/achievement",
  slug: "reach-top-8-000-in-beat-saber",
  title: "Reach Top 8,000 in Beat Saber",
  partOfCollections: ["achievement/beat-saber"],
  position: -8000,
  ownLength: 1388475,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:44.728Z",
  updatedAt: "2026-09-15T15:43:56.000Z",
} as const satisfies Achievement
