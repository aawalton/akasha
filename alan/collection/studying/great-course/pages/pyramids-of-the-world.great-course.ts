import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const pyramidsOfTheWorld = {
  id: "019db533-f387-7f4c-b4ab-83cf07a1415b",
  type: "page-type/great-course",
  slug: "pyramids-of-the-world",
  title: "Pyramids of the World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 364.766667,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "pyramids-of-the-world",
      externalLink: "https://www.thegreatcoursesplus.com/pyramids-of-the-world",
    },
  ],
} as const satisfies GreatCourse
