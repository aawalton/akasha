import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const darkMatterDarkEnergyTheDarkSideOfTheUniverse = {
  id: "019db533-f39f-70bf-b694-00e02f724f1d",
  type: "page-type/great-course",
  slug: "dark-matter-dark-energy-the-dark-side-of-the-universe",
  title: "Dark Matter, Dark Energy: The Dark Side of the Universe",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 749.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "dark-matter-dark-energy-the-dark-side-of-the-universe",
      externalLink:
        "https://www.thegreatcoursesplus.com/dark-matter-dark-energy-the-dark-side-of-the-universe",
    },
  ],
} as const satisfies GreatCourse
