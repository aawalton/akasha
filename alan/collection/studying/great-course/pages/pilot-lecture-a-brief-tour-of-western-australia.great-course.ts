import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureABriefTourOfWesternAustralia = {
  id: "019db533-f39f-7557-99ca-afacb35b3e1e",
  type: "page-type/great-course",
  slug: "pilot-lecture-a-brief-tour-of-western-australia",
  title: "Pilot Lecture: A Brief Tour of Western Australia",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 28.2,
  ownProgress: 28.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pilot-lecture-a-brief-tour-of-western-australia",
      externalLink:
        "https://www.thegreatcoursesplus.com/pilot-lecture-a-brief-tour-of-western-australia",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-09-25T12:51:30.000Z",
} as const satisfies GreatCourse
