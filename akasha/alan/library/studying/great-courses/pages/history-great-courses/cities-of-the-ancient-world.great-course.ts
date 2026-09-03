import type { GreatCourse } from "../../great-course.page-type.ts"

export const citiesOfTheAncientWorld = {
  id: "019db533-f39f-7ea2-a01f-5b5c5d899b6a",
  pageTypeSlug: "great-course",
  slug: "cities-of-the-ancient-world",
  title: "Cities of the Ancient World",
  status: "completed",
  rank: "B",
  unitSlug: "minutes",
  ownLength: 709.8,
  ownProgress: 709.8,
  partOfSlugs: ["all-great-courses", "history-great-courses"],
  source: "the-great-courses",
  externalId: "cities-of-the-ancient-world",
  externalLink: "https://www.thegreatcoursesplus.com/cities-of-the-ancient-world",
} as const satisfies GreatCourse
