import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const understandingTheUniverseAnIntroductionToAstronomy2ndEdition = {
  id: "019db533-f39f-70c9-af21-e31e7c457642",
  type: "page-type/great-course",
  slug: "understanding-the-universe-an-introduction-to-astronomy-2nd-edition",
  title: "Understanding the Universe: An Introduction to Astronomy, 2nd Edition",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 3000,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "understanding-the-universe-an-introduction-to-astronomy-2nd-edition",
      externalLink:
        "https://www.thegreatcoursesplus.com/understanding-the-universe-an-introduction-to-astronomy-2nd-edition",
    },
  ],
} as const satisfies GreatCourse
