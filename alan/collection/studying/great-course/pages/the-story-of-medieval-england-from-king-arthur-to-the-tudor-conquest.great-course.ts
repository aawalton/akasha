import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theStoryOfMedievalEnglandFromKingArthurToTheTudorConquest = {
  id: "019db533-f39f-7bc9-8a19-6442668ffa70",
  type: "page-type/great-course",
  slug: "the-story-of-medieval-england-from-king-arthur-to-the-tudor-conquest",
  title: "The Story of Medieval England: From King Arthur to the Tudor Conquest",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 1147.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/history-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-story-of-medieval-england-from-king-arthur-to-the-tudor-conquest",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-story-of-medieval-england-from-king-arthur-to-the-tudor-conquest",
    },
  ],
} as const satisfies GreatCourse
