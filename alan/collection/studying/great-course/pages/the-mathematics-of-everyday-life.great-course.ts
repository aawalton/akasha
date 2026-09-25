import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theMathematicsOfEverydayLife = {
  id: "019db533-f3a0-7609-a207-3deee1e38161",
  type: "page-type/great-course",
  slug: "the-mathematics-of-everyday-life",
  title: "The Mathematics of Everyday Life",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 348,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/mathematics-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-mathematics-of-everyday-life",
      externalLink: "https://www.thegreatcoursesplus.com/the-mathematics-of-everyday-life",
    },
  ],
} as const satisfies GreatCourse
