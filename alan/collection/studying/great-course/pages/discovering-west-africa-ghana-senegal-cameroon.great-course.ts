import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const discoveringWestAfricaGhanaSenegalCameroon = {
  id: "019db533-f39f-72a9-8d72-7ec5db3cd4de",
  type: "page-type/great-course",
  slug: "discovering-west-africa-ghana-senegal-cameroon",
  title: "Discovering West Africa: Ghana, Senegal, Cameroon",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 247.8,
  ownProgress: 247.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "discovering-west-africa-ghana-senegal-cameroon",
      externalLink:
        "https://www.thegreatcoursesplus.com/discovering-west-africa-ghana-senegal-cameroon",
    },
  ],
} as const satisfies GreatCourse
