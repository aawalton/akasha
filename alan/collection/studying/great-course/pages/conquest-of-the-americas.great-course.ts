import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const conquestOfTheAmericas = {
  id: "019db533-f39f-7e8d-9bf0-c6669ec1e4da",
  type: "page-type/great-course",
  slug: "conquest-of-the-americas",
  title: "Conquest of the Americas",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 723,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "conquest-of-the-americas",
      externalLink: "https://www.thegreatcoursesplus.com/conquest-of-the-americas",
    },
  ],
} as const satisfies GreatCourse
