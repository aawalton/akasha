import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const patternmakingBasicsTheBodiceSloper = {
  id: "019db533-f39e-7447-a7ba-b849afdb51e2",
  type: "page-type/great-course",
  slug: "patternmaking-basics-the-bodice-sloper",
  title: "Patternmaking Basics: The Bodice Sloper",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 306,
  ownProgress: 306,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "patternmaking-basics-the-bodice-sloper",
      externalLink: "https://www.thegreatcoursesplus.com/patternmaking-basics-the-bodice-sloper",
    },
  ],
} as const satisfies GreatCourse
