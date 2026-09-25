import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howChemistrySurroundsYou = {
  id: "01a06578-6719-7002-9d6d-364de7881031",
  type: "page-type/great-course",
  slug: "how-chemistry-surrounds-you",
  title: "How Chemistry Surrounds You",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-chemistry-surrounds-you",
      externalLink: "https://plus.thegreatcourses.com/how-chemistry-surrounds-you",
    },
  ],
} as const satisfies GreatCourse
