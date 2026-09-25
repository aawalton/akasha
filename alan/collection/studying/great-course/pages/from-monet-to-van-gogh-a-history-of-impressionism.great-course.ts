import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const fromMonetToVanGoghAHistoryOfImpressionism = {
  id: "019db533-f39f-76cb-86c9-ffd76facc090",
  type: "page-type/great-course",
  slug: "from-monet-to-van-gogh-a-history-of-impressionism",
  title: "From Monet to Van Gogh: A History of Impressionism",
  status: "completed",
  grade: "B",
  unit: "unit/minutes",
  ownLength: 730.8,
  ownProgress: 730.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/art-great-courses",
    "great-courses-subject/learning-paths-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "from-monet-to-van-gogh-a-history-of-impressionism",
      externalLink:
        "https://www.thegreatcoursesplus.com/from-monet-to-van-gogh-a-history-of-impressionism",
    },
  ],
} as const satisfies GreatCourse
