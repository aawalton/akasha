import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const learningFrenchARendezvousWithFrenchSpeakingCultures = {
  id: "019db533-f39f-75e0-898b-bead596bf1b0",
  type: "page-type/great-course",
  slug: "learning-french-a-rendezvous-with-french-speaking-cultures",
  title: "Learning French: A Rendezvous with French-Speaking Cultures",
  status: "completed",
  grade: "D",
  unit: "unit/minutes",
  ownLength: 1324.8,
  ownProgress: 1324.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/travel-and-culture-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "learning-french-a-rendezvous-with-french-speaking-cultures",
      externalLink:
        "https://www.thegreatcoursesplus.com/learning-french-a-rendezvous-with-french-speaking-cultures",
    },
  ],
} as const satisfies GreatCourse
