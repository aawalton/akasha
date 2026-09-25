import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theCompletePainterLessonsFromTheMasters = {
  id: "019db533-f39f-73b1-8667-a72003bac0cf",
  type: "page-type/great-course",
  slug: "the-complete-painter-lessons-from-the-masters",
  title: "The Complete Painter: Lessons from the Masters",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 976.2,
  ownProgress: 976.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-complete-painter-lessons-from-the-masters",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-complete-painter-lessons-from-the-masters",
    },
  ],
} as const satisfies GreatCourse
