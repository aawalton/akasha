import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLecturePyramidsOfTheWorldAngkorWat = {
  id: "019db533-f3a0-7112-8c7e-463bb92a6a16",
  type: "page-type/great-course",
  slug: "pilot-lecture-pyramids-of-the-world-angkor-wat",
  title: "Pilot Lecture: Pyramids of the World—Angkor Wat",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 31.2,
  ownProgress: 31.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "wondrium-pilots-pyramids-of-the-world-angkor-wat",
      externalLink:
        "https://www.thegreatcoursesplus.com/wondrium-pilots-pyramids-of-the-world-angkor-wat",
    },
  ],
} as const satisfies GreatCourse
