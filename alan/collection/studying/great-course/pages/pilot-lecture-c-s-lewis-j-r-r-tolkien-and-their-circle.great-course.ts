import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureCSLewisJRRTolkienAndTheirCircle = {
  id: "019db533-f39e-783f-a0d2-f8c36ca9ebb6",
  type: "page-type/great-course",
  slug: "pilot-lecture-c-s-lewis-j-r-r-tolkien-and-their-circle",
  title: "Pilot Lecture: C. S. Lewis, J. R. R. Tolkien, and Their Circle",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 32.4,
  ownProgress: 32.4,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-pilots-c-s-lewis-j-r-r-tolkien-and-their-circle",
      externalLink:
        "https://www.thegreatcoursesplus.com/wondrium-pilots-c-s-lewis-j-r-r-tolkien-and-their-circle",
    },
  ],
} as const satisfies GreatCourse
