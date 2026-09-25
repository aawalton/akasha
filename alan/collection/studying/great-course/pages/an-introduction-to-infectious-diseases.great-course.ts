import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const anIntroductionToInfectiousDiseases = {
  id: "019db533-f3a0-7964-8394-f6ffcfb7b7f9",
  type: "page-type/great-course",
  slug: "an-introduction-to-infectious-diseases",
  title: "An Introduction to Infectious Diseases",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 765,
  ownProgress: 765,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/health-and-mindfulness-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "an-introduction-to-infectious-diseases",
      externalLink: "https://www.thegreatcoursesplus.com/an-introduction-to-infectious-diseases",
    },
  ],
} as const satisfies GreatCourse
