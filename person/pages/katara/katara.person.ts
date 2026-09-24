import type { Person } from "akasha/person/person.page-type.types.ts"

export const katara = {
  id: "01a053fe-00f1-74b6-a49f-9f577dba1047",
  type: "page-type/person",
  slug: "katara",
  definition: "Katara Walton, Alan's youngest child",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Katara" }],
  answeredBy: "persona/claude",
  phone: "+13854521484",
} as const satisfies Person
