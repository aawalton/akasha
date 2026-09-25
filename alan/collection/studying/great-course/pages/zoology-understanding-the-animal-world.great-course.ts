import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const zoologyUnderstandingTheAnimalWorld = {
  id: "019db533-f39e-7b18-90b1-9a0f9aa7fc4b",
  type: "page-type/great-course",
  slug: "zoology-understanding-the-animal-world",
  title: "Zoology: Understanding the Animal World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 744,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "zoology-understanding-the-animal-world",
      externalLink: "https://www.thegreatcoursesplus.com/zoology-understanding-the-animal-world",
    },
  ],
} as const satisfies GreatCourse
