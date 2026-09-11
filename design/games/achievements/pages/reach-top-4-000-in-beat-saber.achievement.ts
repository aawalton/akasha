import type { Achievement } from "akasha/design/games/achievements/achievement.page-type.types.ts"

export const reachTop4000InBeatSaber = {
  id: "01a06808-8818-7013-825f-b32e55f255ea",
  type: "achievement",
  slug: "reach-top-4-000-in-beat-saber",
  title: "Reach Top 4,000 in Beat Saber",
  partOfCollections: ["beat-saber"],
  position: -4000,
  ownLength: 1869225,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies Achievement
