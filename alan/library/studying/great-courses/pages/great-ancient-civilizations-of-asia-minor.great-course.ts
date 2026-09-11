import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const greatAncientCivilizationsOfAsiaMinor = {
  id: "019db533-f39f-7e38-bd4d-b669c4f3bb90",
  type: "great-course",
  slug: "great-ancient-civilizations-of-asia-minor",
  title: "Great Ancient Civilizations of Asia Minor",
  status: "completed",
  rank: "C",
  unit: "minutes",
  ownLength: 720,
  ownProgress: 720,
  partOfCollections: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "great-ancient-civilizations-of-asia-minor",
  externalLink: "https://www.thegreatcoursesplus.com/great-ancient-civilizations-of-asia-minor",
} as const satisfies GreatCourse
