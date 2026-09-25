import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const creationStoriesOfTheAmericas = {
  id: "019db533-f389-712d-9e05-67c928da8d45",
  type: "page-type/great-course",
  slug: "creation-stories-of-the-americas",
  title: "Creation Stories of the Americas",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 341.116667,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "creation-stories-of-the-americas",
      externalLink: "https://www.thegreatcoursesplus.com/creation-stories-of-the-americas",
    },
  ],
} as const satisfies GreatCourse
