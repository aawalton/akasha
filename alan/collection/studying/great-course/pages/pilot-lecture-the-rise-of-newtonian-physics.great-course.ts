import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureTheRiseOfNewtonianPhysics = {
  id: "019db533-f39f-71f5-9784-22414563e3aa",
  type: "page-type/great-course",
  slug: "pilot-lecture-the-rise-of-newtonian-physics",
  title: "Pilot Lecture: The Rise of Newtonian Physics",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 22.2,
  ownProgress: 22.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-pilots-the-rise-of-newtonian-physics",
      externalLink:
        "https://plus.thegreatcourses.com/wondrium-pilots-the-rise-of-newtonian-physics",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
