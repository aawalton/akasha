import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theArtOfReading = {
  id: "01a06578-6717-7000-bd37-493c67d08275",
  type: "page-type/great-course",
  slug: "the-art-of-reading",
  title: "The Art of Reading",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-art-of-reading",
      externalLink: "https://plus.thegreatcourses.com/the-art-of-reading",
    },
  ],
} as const satisfies GreatCourse
