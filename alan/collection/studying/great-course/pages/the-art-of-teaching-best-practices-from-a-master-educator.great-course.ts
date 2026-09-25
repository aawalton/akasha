import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theArtOfTeachingBestPracticesFromAMasterEducator = {
  id: "019db533-f39e-7812-990b-9b4fc62da41c",
  type: "page-type/great-course",
  slug: "the-art-of-teaching-best-practices-from-a-master-educator",
  title: "The Art of Teaching: Best Practices from a Master Educator",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 738.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/literature-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-art-of-teaching-best-practices-from-a-master-educator",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-art-of-teaching-best-practices-from-a-master-educator",
    },
  ],
} as const satisfies GreatCourse
