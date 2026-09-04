import type { GreatCourse } from "../../great-course.page-type.ts"

export const theLifeAndWorksOfJaneAusten = {
  id: "019db533-f39e-778c-8157-07692855a6f7",
  pageTypeSlug: "great-course",
  slug: "the-life-and-works-of-jane-austen",
  title: "The Life and Works of Jane Austen",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 703.2,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "literature-great-courses"],
  source: "the-great-courses",
  externalId: "the-life-and-works-of-jane-austen",
  externalLink: "https://www.thegreatcoursesplus.com/the-life-and-works-of-jane-austen",
} as const satisfies GreatCourse
