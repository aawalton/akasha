import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theGreatToursAustraliaAndNewZealand = {
  id: "01a0d3af-4276-7b1d-be13-08d2a83073aa",
  type: "page-type/great-course",
  slug: "the-great-tours-australia-and-new-zealand",
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-great-tours-australia-and-new-zealand",
      externalLink: "https://plus.thegreatcourses.com/the-great-tours-australia-and-new-zealand",
    },
  ],
  title: "The Great Tours: Australia and New Zealand",
} as const satisfies GreatCourse
