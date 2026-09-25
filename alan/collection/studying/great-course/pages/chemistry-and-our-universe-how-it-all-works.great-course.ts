import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const chemistryAndOurUniverseHowItAllWorks = {
  id: "019db533-f39f-704a-a876-bdc5bb5daaf4",
  type: "page-type/great-course",
  slug: "chemistry-and-our-universe-how-it-all-works",
  title: "Chemistry and Our Universe: How It All Works",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1818,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "chemistry-and-our-universe-how-it-all-works",
      externalLink:
        "https://www.thegreatcoursesplus.com/chemistry-and-our-universe-how-it-all-works",
    },
  ],
} as const satisfies GreatCourse
