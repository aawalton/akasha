import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const theGreatCourses = {
  id: "01a0d492-5b03-768a-bd58-16d694d5f2b1",
  type: "page-type/domain",
  slug: "the-great-courses",
  definition: "a company that sells courses",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "The Great Courses" }],
  createdAt: "2026-09-24T17:59:16.483Z",
  updatedAt: "2026-09-24T18:01:45.000Z",
} as const satisfies Domain
