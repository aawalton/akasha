import type { GreatCourse } from "../../great-course.page-type.ts"

export const creationStoriesOfTheAncientWorld = {
  id: "019db533-f39e-7cb6-ba2b-5146b752c579",
  pageTypeSlug: "great-course",
  slug: "creation-stories-of-the-ancient-world",
  title: "Creation Stories of the Ancient World",
  status: "completed",
  rank: "C",
  unitSlug: "minutes",
  ownLength: 300,
  ownProgress: 300,
  partOfSlugs: ["all-great-courses", "philosophy-and-religion-great-courses"],
  source: "the-great-courses",
  externalId: "creation-stories-of-the-ancient-world",
  externalLink: "https://www.thegreatcoursesplus.com/creation-stories-of-the-ancient-world",
} as const satisfies GreatCourse
