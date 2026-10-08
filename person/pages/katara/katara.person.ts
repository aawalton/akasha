import type { Person } from "akasha/person/person.page-type.types.ts"

export const katara = {
  id: "01a053fe-00f1-74b6-a49f-9f577dba1047",
  type: "page-type/person",
  slug: "katara",
  definition: "Katara Walton, Alan's youngest child",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Katara" }],
  answeredBy: "persona/claude",
  phone: "+13854521484",
  createdAt: "2026-08-30T18:45:50.449Z",
  updatedAt: "2026-09-24T17:45:18.000Z",
} as const satisfies Person
