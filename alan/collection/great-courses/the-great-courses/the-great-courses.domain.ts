import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const theGreatCourses = {
  id: "01a0d492-5b03-768a-bd58-16d694d5f2b1",
  type: "page-type/domain",
  slug: "the-great-courses",
  definition: "a company selling courses",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "The Great Courses" }],
} as const satisfies Domain
