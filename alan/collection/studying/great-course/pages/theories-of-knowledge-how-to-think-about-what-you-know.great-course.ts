import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theoriesOfKnowledgeHowToThinkAboutWhatYouKnow = {
  id: "019db533-f39e-7bed-a8d8-d156b13a5587",
  type: "page-type/great-course",
  slug: "theories-of-knowledge-how-to-think-about-what-you-know",
  title: "Theories of Knowledge: How to Think about What You Know",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 693.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "theories-of-knowledge-how-to-think-about-what-you-know",
      externalLink:
        "https://www.thegreatcoursesplus.com/theories-of-knowledge-how-to-think-about-what-you-know",
    },
  ],
} as const satisfies GreatCourse
