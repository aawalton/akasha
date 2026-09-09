import type { GameAchievement } from "../game-achievement.page-type.ts"

export const projectEuler = {
  id: "01a06808-8818-700c-bbd4-3ff7aadd7f6e",
  pageTypeSlug: "game-achievement",
  type: "game-achievement",
  slug: "project-euler",
  title: "Project Euler",
  partOfCollections: ["game-achievements"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "in-progress",
  rank: "A",
  externalLink: "https://projecteuler.net/",
} as const satisfies GameAchievement
