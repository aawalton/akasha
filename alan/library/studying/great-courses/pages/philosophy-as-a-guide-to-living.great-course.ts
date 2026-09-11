import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const philosophyAsAGuideToLiving = {
  id: "019db533-f39e-7a85-97f5-27f6623f9d82",
  type: "great-course",
  slug: "philosophy-as-a-guide-to-living",
  title: "Philosophy as a Guide to Living",
  status: "not-started",
  unit: "minutes",
  ownLength: 739.8,
  ownProgress: 0,
  partOfCollections: ["all-great-courses", "philosophy-and-religion-great-courses"],
  source: "the-great-courses",
  externalId: "philosophy-as-a-guide-to-living",
  externalLink: "https://www.thegreatcoursesplus.com/philosophy-as-a-guide-to-living",
} as const satisfies GreatCourse
