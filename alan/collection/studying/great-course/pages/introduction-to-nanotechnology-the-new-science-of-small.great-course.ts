import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const introductionToNanotechnologyTheNewScienceOfSmall = {
  id: "019db533-f39f-72c8-a178-980f23db7e50",
  type: "page-type/great-course",
  slug: "introduction-to-nanotechnology-the-new-science-of-small",
  title: "Introduction to Nanotechnology: The New Science of Small",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 734.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "introduction-to-nanotechnology-the-new-science-of-small",
      externalLink:
        "https://www.thegreatcoursesplus.com/introduction-to-nanotechnology-the-new-science-of-small",
    },
  ],
} as const satisfies GreatCourse
