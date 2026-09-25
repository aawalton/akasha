import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const veterinarySchoolForEveryoneCaringForCatsAndDogs = {
  id: "019db533-f39e-754c-b8c5-78911e2985ad",
  type: "page-type/great-course",
  slug: "veterinary-school-for-everyone-caring-for-cats-and-dogs",
  title: "Veterinary School for Everyone: Caring for Cats and Dogs",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 684,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "veterinary-school-for-everyone-caring-for-cats-and-dogs",
      externalLink:
        "https://www.thegreatcoursesplus.com/veterinary-school-for-everyone-caring-for-cats-and-dogs",
    },
  ],
} as const satisfies GreatCourse
