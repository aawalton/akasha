import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const foundationsOfOrganicChemistry = {
  id: "019db533-f39f-702a-9b48-55480018d5ad",
  type: "page-type/great-course",
  slug: "foundations-of-organic-chemistry",
  title: "Foundations of Organic Chemistry",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1105.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "foundations-of-organic-chemistry",
      externalLink: "https://www.thegreatcoursesplus.com/foundations-of-organic-chemistry",
    },
  ],
} as const satisfies GreatCourse
