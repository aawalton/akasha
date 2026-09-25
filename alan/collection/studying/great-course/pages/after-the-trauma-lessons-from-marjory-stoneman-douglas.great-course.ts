import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const afterTheTraumaLessonsFromMarjoryStonemanDouglas = {
  id: "019db533-f39e-760f-a487-c091ec999a5b",
  type: "page-type/great-course",
  slug: "after-the-trauma-lessons-from-marjory-stoneman-douglas",
  title: "After the Trauma: Lessons from Marjory Stoneman Douglas",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 43.8,
  ownProgress: 43.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "after-the-trauma-lessons-from-marjory-stoneman-douglas",
      externalLink:
        "https://www.thegreatcoursesplus.com/after-the-trauma-lessons-from-marjory-stoneman-douglas",
    },
  ],
} as const satisfies GreatCourse
