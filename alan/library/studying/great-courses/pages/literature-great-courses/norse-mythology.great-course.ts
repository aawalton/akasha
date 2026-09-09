import type { GreatCourse } from "../../great-course.page-type.ts"

export const norseMythology = {
  id: "019db533-f39e-78b6-91fe-7ceda2c1d2ae",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "norse-mythology",
  title: "Norse Mythology",
  status: "in-progress",
  unit: "minutes",
  ownLength: 681,
  ownProgress: 56.75,
  partOfCollections: ["all-great-courses", "literature-great-courses"],
  source: "the-great-courses",
  externalId: "norse-mythology",
  externalLink: "https://www.thegreatcoursesplus.com/norse-mythology",
} as const satisfies GreatCourse
