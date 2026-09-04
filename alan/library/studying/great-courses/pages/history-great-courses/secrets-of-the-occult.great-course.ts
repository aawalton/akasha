import type { GreatCourse } from "../../great-course.page-type.ts"

export const secretsOfTheOccult = {
  id: "019db533-f39f-7d99-aec4-7beb1b6686bc",
  pageTypeSlug: "great-course",
  slug: "secrets-of-the-occult",
  title: "Secrets of the Occult",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 709.2,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "secrets-of-the-occult",
  externalLink: "https://www.thegreatcoursesplus.com/secrets-of-the-occult",
} as const satisfies GreatCourse
