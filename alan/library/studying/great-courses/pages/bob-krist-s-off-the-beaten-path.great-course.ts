import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const bobKristSOffTheBeatenPath = {
  id: "019db533-f39f-76b6-bf59-aa3f0387dd03",
  type: "great-course",
  slug: "bob-krist-s-off-the-beaten-path",
  title: "Bob Krist’s Off the Beaten Path",
  status: "completed",
  rank: "B",
  unit: "minutes",
  ownLength: 232.2,
  ownProgress: 232.2,
  partOfCollections: ["all-great-courses", "travel-and-culture-great-courses"],
  source: "the-great-courses",
  externalId: "bob-krist-s-off-the-beaten-path",
  externalLink: "https://www.thegreatcoursesplus.com/bob-krist-s-off-the-beaten-path",
} as const satisfies GreatCourse
