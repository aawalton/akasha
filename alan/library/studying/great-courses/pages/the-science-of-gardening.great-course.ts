import type { GreatCourse } from "../great-course.page-type.types.ts"

export const theScienceOfGardening = {
  id: "019db533-f39e-76bc-99d8-de0770d0fd8c",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "the-science-of-gardening",
  title: "The Science of Gardening",
  status: "not-started",
  unit: "minutes",
  ownLength: 721.2,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "hobby-and-personal-pursuits-great-courses"],
  source: "the-great-courses",
  externalId: "the-science-of-gardening",
  externalLink: "https://www.thegreatcoursesplus.com/the-science-of-gardening",
} as const satisfies GreatCourse
