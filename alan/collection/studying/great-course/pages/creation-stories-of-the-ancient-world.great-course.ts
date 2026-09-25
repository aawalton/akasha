import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const creationStoriesOfTheAncientWorld = {
  id: "019db533-f39e-7cb6-ba2b-5146b752c579",
  type: "page-type/great-course",
  slug: "creation-stories-of-the-ancient-world",
  title: "Creation Stories of the Ancient World",
  status: "completed",
  grade: "C",
  unit: "unit/minutes",
  ownLength: 300,
  ownProgress: 300,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "creation-stories-of-the-ancient-world",
      externalLink: "https://www.thegreatcoursesplus.com/creation-stories-of-the-ancient-world",
    },
  ],
} as const satisfies GreatCourse
