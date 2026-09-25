import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const readingBiblicalLiteratureGenesisToRevelation = {
  id: "019db533-f39e-7c6a-94ee-16ea80571b4c",
  type: "page-type/great-course",
  slug: "reading-biblical-literature-genesis-to-revelation",
  title: "Reading Biblical Literature: Genesis to Revelation",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1111.8,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "reading-biblical-literature-genesis-to-revelation",
      externalLink:
        "https://www.thegreatcoursesplus.com/reading-biblical-literature-genesis-to-revelation",
    },
  ],
} as const satisfies GreatCourse
