import type { Person } from "akasha/person/person.page-type.types.ts"

export const joseph = {
  id: "01a053fe-00f1-710c-a23f-1afa9aeaa01f",
  type: "page-type/person",
  slug: "joseph",
  definition: "Joseph Walton, Alan's middle child",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Joseph" }],
  answeredBy: "persona/claude",
  phone: "+18016363076",
} as const satisfies Person
