import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const biologyTheScienceOfLife = {
  id: "019db533-f39f-72dd-a003-cbd2d837116b",
  type: "page-type/great-course",
  slug: "biology-the-science-of-life",
  title: "Biology: The Science of Life",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 2180.53,
  ownProgress: 242.17,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/learning-paths-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "biology-the-science-of-life",
      externalLink: "https://plus.thegreatcourses.com/biology-the-science-of-life",
    },
  ],
  createdAt: "2026-04-22T12:39:34.047Z",
  updatedAt: "2026-10-19T17:12:11.704Z",
  progressedAt: "2026-10-19T17:12:11.704Z",
} as const satisfies GreatCourse
