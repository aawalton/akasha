import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureTheDevelopingBrain = {
  id: "019db533-f39e-7e99-a8cf-5172f57562cf",
  type: "page-type/great-course",
  slug: "pilot-lecture-the-developing-brain",
  title: "Pilot Lecture: The Developing Brain",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 34.8,
  ownProgress: 34.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "plus-pilots-the-developing-brain",
      externalLink: "https://www.thegreatcoursesplus.com/plus-pilots-the-developing-brain",
    },
  ],
} as const satisfies GreatCourse
