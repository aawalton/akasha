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
      externalLink: "https://plus.thegreatcourses.com/foundations-of-organic-chemistry",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-18T21:07:43.678Z",
} as const satisfies GreatCourse
