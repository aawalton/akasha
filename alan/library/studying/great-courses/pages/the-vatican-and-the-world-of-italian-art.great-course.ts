import type { GreatCourse } from "../great-course.page-type.types.ts"

export const theVaticanAndTheWorldOfItalianArt = {
  id: "01a06578-6719-7008-8a32-cba3895c1746",
  pageTypeSlug: "great-course",
  type: "great-course",
  slug: "the-vatican-and-the-world-of-italian-art",
  title: "The Vatican and the World of Italian Art",
  status: "not-started",
  unit: "minutes",
  ownLength: 14,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "art-great-courses"],
  source: "the-great-courses",
  externalId: "the-vatican-and-the-world-of-italian-art",
  externalLink: "https://plus.thegreatcourses.com/the-vatican-and-the-world-of-italian-art",
} as const satisfies GreatCourse
