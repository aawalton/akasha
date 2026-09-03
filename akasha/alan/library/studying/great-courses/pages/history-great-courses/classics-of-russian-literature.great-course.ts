import type { GreatCourse } from "../../great-course.page-type.ts"

export const classicsOfRussianLiterature = {
  id: "019db533-f39f-7f6d-9f83-eae174b70082",
  pageTypeSlug: "great-course",
  slug: "classics-of-russian-literature",
  title: "Classics of Russian Literature",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 1085.4,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses", "literature-great-courses"],
  source: "the-great-courses",
  externalId: "classics-of-russian-literature",
  externalLink: "https://www.thegreatcoursesplus.com/classics-of-russian-literature",
} as const satisfies GreatCourse
