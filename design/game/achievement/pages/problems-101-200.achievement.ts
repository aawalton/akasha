import type { Achievement } from "akasha/design/game/achievement/achievement.page-type.types.ts"

export const problems101200 = {
  id: "01a06808-8818-7003-9dc0-047e35a68bed",
  type: "page-type/achievement",
  slug: "problems-101-200",
  title: "Problems 101-200",
  partOfCollections: ["achievement/project-euler"],
  position: 2,
  ownLength: 1000000,
  ownProgress: 220000,
  unit: "unit/words",
  status: "in-progress",
  rank: "A",
} as const satisfies Achievement
