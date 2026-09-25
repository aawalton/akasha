import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const naturalLawAndHumanNature = {
  id: "019db533-f388-70c0-ad93-0443518b5740",
  type: "page-type/great-course",
  slug: "natural-law-and-human-nature",
  title: "Natural Law and Human Nature",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 737.816667,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "natural-law-and-human-nature",
      externalLink: "https://www.thegreatcoursesplus.com/natural-law-and-human-nature",
    },
  ],
} as const satisfies GreatCourse
