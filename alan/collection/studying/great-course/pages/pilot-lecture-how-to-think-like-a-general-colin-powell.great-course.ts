import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pilotLectureHowToThinkLikeAGeneralColinPowell = {
  id: "01a06578-6718-7001-981d-d9bdb38bef29",
  type: "page-type/great-course",
  slug: "pilot-lecture-how-to-think-like-a-general-colin-powell",
  title: "Pilot Lecture: How to Think like a General—Colin Powell",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pilot-lecture-how-to-think-like-a-general-colin-powell",
      externalLink:
        "https://plus.thegreatcourses.com/pilot-lecture-how-to-think-like-a-general-colin-powell",
    },
  ],
} as const satisfies GreatCourse
