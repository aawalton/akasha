import type { Achievement } from "akasha/design/game/achievement/achievement.page-type.types.ts"

export const reachTop4000InBeatSaber = {
  id: "01a06808-8818-7013-825f-b32e55f255ea",
  type: "page-type/achievement",
  slug: "reach-top-4-000-in-beat-saber",
  title: "Reach Top 4,000 in Beat Saber",
  partOfCollections: ["achievement/beat-saber"],
  position: -4000,
  ownLength: 1869225,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:44.728Z",
  updatedAt: "2026-09-15T15:43:56.000Z",
} as const satisfies Achievement
