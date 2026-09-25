import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const rediscoveringTheAgeOfDinosaurs = {
  id: "019db533-f39e-7eae-963b-b2ffe7c16f50",
  type: "page-type/great-course",
  slug: "rediscovering-the-age-of-dinosaurs",
  title: "Rediscovering the Age of Dinosaurs",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 610.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "rediscovering-the-age-of-dinosaurs",
      externalLink: "https://www.thegreatcoursesplus.com/rediscovering-the-age-of-dinosaurs",
    },
  ],
} as const satisfies GreatCourse
