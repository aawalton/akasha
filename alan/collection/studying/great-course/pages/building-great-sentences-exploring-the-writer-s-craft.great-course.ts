import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const buildingGreatSentencesExploringTheWriterSCraft = {
  id: "019db533-f39e-79b4-86ed-fe3cbaaf0d82",
  type: "page-type/great-course",
  slug: "building-great-sentences-exploring-the-writer-s-craft",
  title: "Building Great Sentences: Exploring the Writer's Craft",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 740.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "building-great-sentences-exploring-the-writers-craft",
      externalLink:
        "https://www.thegreatcoursesplus.com/building-great-sentences-exploring-the-writers-craft",
    },
  ],
} as const satisfies GreatCourse
