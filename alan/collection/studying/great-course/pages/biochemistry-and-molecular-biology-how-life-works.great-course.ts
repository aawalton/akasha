import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const biochemistryAndMolecularBiologyHowLifeWorks = {
  id: "019db533-f39f-70d4-aae7-39198481b873",
  type: "page-type/great-course",
  slug: "biochemistry-and-molecular-biology-how-life-works",
  title: "Biochemistry and Molecular Biology: How Life Works",
  status: "in-progress",
  unit: "unit/minutes",
  ownLength: 1106.4,
  ownProgress: 61.466667,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "biochemistry-and-molecular-biology-how-life-works",
      externalLink:
        "https://www.thegreatcoursesplus.com/biochemistry-and-molecular-biology-how-life-works",
    },
  ],
} as const satisfies GreatCourse
