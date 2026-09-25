import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const decorateLikeADesignerWithJonathanAdler = {
  id: "019db533-f39e-762f-ab54-b5ddce005736",
  type: "page-type/great-course",
  slug: "decorate-like-a-designer-with-jonathan-adler",
  title: "Decorate like a Designer, with Jonathan Adler",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 352.2,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "decorate-like-a-designer-with-jonathan-adler",
      externalLink:
        "https://www.thegreatcoursesplus.com/decorate-like-a-designer-with-jonathan-adler",
    },
  ],
} as const satisfies GreatCourse
