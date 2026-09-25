import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingModernElectronics = {
  id: "019db533-f39e-7db1-9fcf-a26f0821db7c",
  type: "page-type/great-course",
  slug: "understanding-modern-electronics",
  title: "Understanding Modern Electronics",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 879.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-modern-electronics",
      externalLink: "https://www.thegreatcoursesplus.com/understanding-modern-electronics",
    },
  ],
} as const satisfies GreatCourse
