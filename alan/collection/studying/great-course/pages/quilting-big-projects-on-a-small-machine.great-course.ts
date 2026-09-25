import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const quiltingBigProjectsOnASmallMachine = {
  id: "019db533-f39e-75f2-9169-08fb5dbd6322",
  type: "page-type/great-course",
  slug: "quilting-big-projects-on-a-small-machine",
  title: "Quilting Big Projects on a Small Machine",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 262.2,
  ownProgress: 262.2,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "quilting-big-projects-on-a-small-machine",
      externalLink: "https://www.thegreatcoursesplus.com/quilting-big-projects-on-a-small-machine",
    },
  ],
} as const satisfies GreatCourse
