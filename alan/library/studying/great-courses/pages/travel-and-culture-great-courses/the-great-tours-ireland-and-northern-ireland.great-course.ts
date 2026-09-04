import type { GreatCourse } from "../../great-course.page-type.ts"

export const theGreatToursIrelandAndNorthernIreland = {
  id: "019db533-f39f-716a-9dd0-4e9c14842060",
  pageTypeSlug: "great-course",
  slug: "the-great-tours-ireland-and-northern-ireland",
  title: "The Great Tours: Ireland and Northern Ireland",
  status: "completed",
  rank: "D",
  unitSlug: "minutes",
  ownLength: 753.6,
  ownProgress: 753.6,
  partOfSlugs: ["all-great-courses", "travel-and-culture-great-courses"],
  source: "the-great-courses",
  externalId: "the-great-tours-ireland-and-northern-ireland",
  externalLink: "https://www.thegreatcoursesplus.com/the-great-tours-ireland-and-northern-ireland",
} as const satisfies GreatCourse
