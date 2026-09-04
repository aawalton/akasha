import type { GameAchievement } from "../game-achievement.page-type.ts"

export const reachTop11000InBeatSaber = {
  id: "01a06808-8818-700f-943b-db97d7158de1",
  pageTypeSlug: "game-achievement",
  slug: "reach-top-11-000-in-beat-saber",
  title: "Reach Top 11,000 in Beat Saber",
  partOfSlugs: ["beat-saber"],
  position: -11000,
  ownLength: 1260025,
  ownProgress: 1260025,
  unitSlug: "words",
  status: "completed",
  rank: "A",
} as const satisfies GameAchievement
