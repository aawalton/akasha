import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const biologyTheScienceOfLife = {
  id: "019db533-f39f-72dd-a003-cbd2d837116b",
  type: "page-type/great-course",
  slug: "biology-the-science-of-life",
  title: "Biology: The Science of Life",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 2181,
  ownProgress: 242.333333,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "biology-the-science-of-life",
      externalLink: "https://www.thegreatcoursesplus.com/biology-the-science-of-life",
    },
  ],
} as const satisfies GreatCourse
