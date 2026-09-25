import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theKnightsTemplarAHistoryStrangeAndTrue = {
  id: "019db533-f398-73ae-845d-2eaa4ac97f28",
  type: "page-type/great-course",
  slug: "the-knights-templar-a-history-strange-and-true",
  title: "The Knights Templar: A History Strange and True",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 663,
  ownProgress: 0,
  partOfCollections: ["great-courses-collection/all-great-courses"],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-knights-templar-a-history-strange-and-true",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-knights-templar-a-history-strange-and-true",
    },
  ],
} as const satisfies GreatCourse
