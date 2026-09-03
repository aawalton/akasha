import type { GreatCourse } from "../../great-course.page-type.ts"

export const theMysteriousEtruscans = {
  id: "019db533-f39f-7785-95f6-b48e0a267d75",
  pageTypeSlug: "great-course",
  slug: "the-mysterious-etruscans",
  title: "The Mysterious Etruscans",
  status: "not-started",
  unitSlug: "minutes",
  ownLength: 759,
  ownProgress: 0,
  partOfSlugs: ["all-great-courses", "history-great-courses", "learning-paths-great-courses"],
  source: "the-great-courses",
  externalId: "the-mysterious-etruscans",
  externalLink: "https://www.thegreatcoursesplus.com/the-mysterious-etruscans",
} as const satisfies GreatCourse
