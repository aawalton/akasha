import type { GreatCourse } from "../../great-course.page-type.ts"

export const conquestOfTheAmericas = {
  id: "019db533-f39f-7e8d-9bf0-c6669ec1e4da",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "conquest-of-the-americas",
  title: "Conquest of the Americas",
  status: "not-started",
  unit: "minutes",
  ownLength: 723,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "conquest-of-the-americas",
  externalLink: "https://www.thegreatcoursesplus.com/conquest-of-the-americas",
} as const satisfies GreatCourse
