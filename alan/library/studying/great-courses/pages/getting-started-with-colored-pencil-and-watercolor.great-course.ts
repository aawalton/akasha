import type { GreatCourse } from "akasha/alan/library/studying/great-courses/great-course.page-type.types.ts"

export const gettingStartedWithColoredPencilAndWatercolor = {
  id: "019db533-f39f-7620-9dbb-8b8c24faadbc",
  type: "great-course",
  slug: "getting-started-with-colored-pencil-and-watercolor",
  title: "Getting Started With Colored Pencil & Watercolor",
  status: "completed",
  rank: "D",
  unit: "minutes",
  ownLength: 132.6,
  ownProgress: 132.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "getting-started-with-colored-pencil-watercolor",
      externalLink:
        "https://www.thegreatcoursesplus.com/getting-started-with-colored-pencil-watercolor",
    },
  ],
} as const satisfies GreatCourse
