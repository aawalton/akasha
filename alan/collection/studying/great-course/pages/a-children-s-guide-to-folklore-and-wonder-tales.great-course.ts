import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const aChildrenSGuideToFolkloreAndWonderTales = {
  id: "019db533-f39e-790b-9b9e-91582a6ce7a8",
  type: "page-type/great-course",
  slug: "a-children-s-guide-to-folklore-and-wonder-tales",
  title: "A Children's Guide to Folklore and Wonder Tales",
  status: "completed",
  grade: "A",
  unit: "unit/minutes",
  ownLength: 754.8,
  ownProgress: 754.8,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/literature-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "a-childrens-guide-to-folklore-and-wonder-tales",
      externalLink:
        "https://www.thegreatcoursesplus.com/a-childrens-guide-to-folklore-and-wonder-tales",
    },
  ],
} as const satisfies GreatCourse
