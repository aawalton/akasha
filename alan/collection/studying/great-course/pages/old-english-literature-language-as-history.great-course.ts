import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const oldEnglishLiteratureLanguageAsHistory = {
  id: "019db533-f39e-78a0-b23c-6eaea8c18149",
  type: "page-type/great-course",
  slug: "old-english-literature-language-as-history",
  title: "Old English Literature: Language as History",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 760.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "old-english-literature-language-as-history",
      externalLink:
        "https://www.thegreatcoursesplus.com/old-english-literature-language-as-history",
    },
  ],
} as const satisfies GreatCourse
