import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const pilotLectureTheDevelopingBrain = {
  id: "019db533-f39e-7e99-a8cf-5172f57562cf",
  type: "great-course",
  slug: "pilot-lecture-the-developing-brain",
  title: "Pilot Lecture: The Developing Brain",
  status: "completed",
  rank: "B",
  unit: "minutes",
  ownLength: 34.8,
  ownProgress: 34.8,
  partOfCollections: ["all-great-courses", "science-great-courses"],
  source: "the-great-courses",
  externalId: "plus-pilots-the-developing-brain",
  externalLink: "https://www.thegreatcoursesplus.com/plus-pilots-the-developing-brain",
} as const satisfies GreatCourse
