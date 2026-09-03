import type { GreatCourse } from "../../great-course.page-type.ts"

export const theGreatToursGreeceAndTurkeyFromAthensToIstanbul = {
  id: "019db533-f39f-7716-9671-4b55f1db1c16",
  pageTypeSlug: "great-course",
  slug: "the-great-tours-greece-and-turkey-from-athens-to-istanbul",
  title: "The Great Tours: Greece and Turkey, from Athens to Istanbul",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 749.4,
  ownProgress: 749.4,
  partOfSlugs: ["all-great-courses", "history-great-courses", "travel-and-culture-great-courses"],
  source: "the-great-courses",
  externalId: "the-great-tours-greece-and-turkey-from-athens-to-istanbul",
  externalLink:
    "https://www.thegreatcoursesplus.com/the-great-tours-greece-and-turkey-from-athens-to-istanbul",
} as const satisfies GreatCourse
