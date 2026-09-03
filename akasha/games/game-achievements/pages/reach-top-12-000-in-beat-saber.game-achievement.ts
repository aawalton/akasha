import type { GameAchievement } from "../game-achievement.page-type.ts"

export const reachTop12000InBeatSaber = {
  id: "01a06808-8818-7010-8648-0b75fa78ec3c",
  pageTypeSlug: "game-achievement",
  slug: "reach-top-12-000-in-beat-saber",
  title: "Reach Top 12,000 in Beat Saber",
  partOfSlugs: ["beat-saber"],
  position: -12000,
  ownLength: 1108575,
  ownProgress: 1108575,
  unitSlug: "words",
  status: "completed",
  rank: "A",
} as const satisfies GameAchievement
