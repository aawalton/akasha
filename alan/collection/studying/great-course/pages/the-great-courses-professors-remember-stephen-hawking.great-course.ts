import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatCoursesProfessorsRememberStephenHawking = {
  id: "019db533-f39e-7d6e-b510-3ab5bf34c13e",
  type: "page-type/great-course",
  slug: "the-great-courses-professors-remember-stephen-hawking",
  title: "The Great Courses Professors Remember Stephen Hawking",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 12,
  ownProgress: 12,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-courses-professors-remember-stephen-hawking",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-great-courses-professors-remember-stephen-hawking",
    },
  ],
} as const satisfies GreatCourse
