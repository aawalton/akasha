import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const startupProjectNatureInWatercolor = {
  id: "019db533-f39f-7405-a745-6b8fc50aae1b",
  type: "page-type/great-course",
  slug: "startup-project-nature-in-watercolor",
  title: "Startup Project: Nature in Watercolor",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 132.6,
  ownProgress: 132.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "startup-project-nature-in-watercolor",
      externalLink: "https://www.thegreatcoursesplus.com/startup-project-nature-in-watercolor",
    },
  ],
} as const satisfies GreatCourse
