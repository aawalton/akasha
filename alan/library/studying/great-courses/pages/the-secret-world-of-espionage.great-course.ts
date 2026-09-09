import type { GreatCourse } from "../great-course.page-type.ts"

export const theSecretWorldOfEspionage = {
  id: "019db533-f39f-7cbb-a48b-60b0f3f4541a",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "the-secret-world-of-espionage",
  title: "The Secret World of Espionage",
  status: "not-started",
  unit: "minutes",
  ownLength: 269.4,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "the-secret-world-of-espionage",
  externalLink: "https://www.thegreatcoursesplus.com/the-secret-world-of-espionage",
} as const satisfies GreatCourse
