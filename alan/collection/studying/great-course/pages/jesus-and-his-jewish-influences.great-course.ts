import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const jesusAndHisJewishInfluences = {
  id: "019db533-f39e-7a14-9f7e-ad4747b9b2aa",
  type: "page-type/great-course",
  slug: "jesus-and-his-jewish-influences",
  title: "Jesus and His Jewish Influences",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 732.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/philosophy-and-religion-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "jesus-and-his-jewish-influences",
      externalLink: "https://www.thegreatcoursesplus.com/jesus-and-his-jewish-influences",
    },
  ],
} as const satisfies GreatCourse
