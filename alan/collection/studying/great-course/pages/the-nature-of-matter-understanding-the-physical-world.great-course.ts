import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const theNatureOfMatterUnderstandingThePhysicalWorld = {
  id: "019db533-f39e-7e19-91bc-b964614f1a17",
  type: "page-type/great-course",
  slug: "the-nature-of-matter-understanding-the-physical-world",
  title: "The Nature of Matter: Understanding the Physical World",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 738,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "the-nature-of-matter-understanding-the-physical-world",
      externalLink:
        "https://www.thegreatcoursesplus.com/the-nature-of-matter-understanding-the-physical-world",
    },
  ],
} as const satisfies GreatCourse
