import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const bobKristSOffTheBeatenPath = {
  id: "019db533-f39f-76b6-bf59-aa3f0387dd03",
  type: "page-type/great-course",
  slug: "bob-krist-s-off-the-beaten-path",
  title: "Bob Krist’s Off the Beaten Path",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 232.2,
  ownProgress: 232.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "bob-krist-s-off-the-beaten-path",
      externalLink: "https://www.thegreatcoursesplus.com/bob-krist-s-off-the-beaten-path",
    },
  ],
} as const satisfies GreatCourse
