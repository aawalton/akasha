import type { GreatCourse } from "../great-course.page-type.types.ts"

export const pilotLectureHistoryOfRace = {
  id: "019db533-f3a0-712c-b6b3-ac9c6801630b",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "pilot-lecture-history-of-race",
  title: "Pilot Lecture: History of Race",
  status: "completed",
  rank: "C",
  unit: "minutes",
  ownLength: 37.8,
  ownProgress: 37.8,
  partOfCollections: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "history-of-race",
  externalLink: "https://www.thegreatcoursesplus.com/history-of-race",
} as const satisfies GreatCourse
