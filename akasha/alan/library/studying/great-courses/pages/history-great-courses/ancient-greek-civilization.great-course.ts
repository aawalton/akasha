import type { GreatCourse } from "../../great-course.page-type.ts"

export const ancientGreekCivilization = {
  id: "019db533-f39f-7ed7-bdd5-bcbcfca8ac36",
  pageTypeSlug: "great-course",
  slug: "ancient-greek-civilization",
  title: "Ancient Greek Civilization",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 723,
  ownProgress: 723,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "ancient-greek-civilization",
  externalLink: "https://www.thegreatcoursesplus.com/ancient-greek-civilization",
} as const satisfies GreatCourse
