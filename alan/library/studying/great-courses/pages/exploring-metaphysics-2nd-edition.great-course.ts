import type { GreatCourse } from "../great-course.page-type.ts"

export const exploringMetaphysics2ndEdition = {
  id: "01a06578-671c-7002-a64b-3935933d1ed4",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "exploring-metaphysics-2nd-edition",
  title: "Exploring Metaphysics, 2nd Edition",
  status: "not-started",
  unit: "minutes",
  ownLength: 30,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "philosophy-and-religion-great-courses"],
  source: "the-great-courses",
  externalId: "exploring-metaphysics-2nd-edition",
  externalLink: "https://plus.thegreatcourses.com/exploring-metaphysics-2nd-edition",
} as const satisfies GreatCourse
