import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theArtOfStorytellingFromParentsToProfessionals = {
  id: "019db533-f39e-780a-9c80-0061c6d367cd",
  type: "page-type/great-course",
  slug: "the-art-of-storytelling-from-parents-to-professionals",
  title: "The Art of Storytelling: From Parents to Professionals",
  status: "completed",
  grade: "A",
  unit: "unit/minutes",
  ownLength: 753.6,
  ownProgress: 753.6,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-art-of-storytelling-from-parents-to-professionals",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-art-of-storytelling-from-parents-to-professionals",
    },
  ],
} as const satisfies GreatCourse
