import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const raisingEmotionallyAndSociallyHealthyKids = {
  id: "019db533-f39e-7c27-969c-9db498b5b588",
  type: "page-type/great-course",
  slug: "raising-emotionally-and-socially-healthy-kids",
  title: "Raising Emotionally and Socially Healthy Kids",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 368.4,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/science-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "raising-emotionally-and-socially-healthy-kids",
      externalLink:
        "https://www.thegreatcoursesplus.com/raising-emotionally-and-socially-healthy-kids",
    },
  ],
} as const satisfies GreatCourse
