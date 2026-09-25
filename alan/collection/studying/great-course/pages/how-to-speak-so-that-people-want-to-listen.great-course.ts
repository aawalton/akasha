import type { GreatCourse } from "akasha/alan/collection/studying/great-course/great-course.page-type.types.ts"

export const howToSpeakSoThatPeopleWantToListen = {
  id: "019db533-f39e-74c2-9173-04ffb1c5ebee",
  type: "page-type/great-course",
  slug: "how-to-speak-so-that-people-want-to-listen",
  title: "How to Speak So That People Want to Listen",
  status: "not-started",
  unit: "unit/minutes",
  ownLength: 417.6,
  ownProgress: 0,
  partOfCollections: [
    "great-courses-collection/all-great-courses",
    "great-courses-subject/business-and-finance-great-courses",
    "great-courses-subject/hobby-and-personal-pursuits-great-courses",
    "great-courses-subject/professional-growth-great-courses",
  ],
  externalIdentity: [
    {
      source: "the-great-courses",
      externalId: "how-to-speak-so-that-people-want-to-listen",
      externalLink:
        "https://www.thegreatcoursesplus.com/how-to-speak-so-that-people-want-to-listen",
    },
  ],
} as const satisfies GreatCourse
