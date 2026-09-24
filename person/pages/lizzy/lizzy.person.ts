import type { Person } from "akasha/person/person.page-type.types.ts"

export const lizzy = {
  id: "01a053fe-00f2-7cf3-92bc-694ea856500c",
  type: "page-type/person",
  slug: "lizzy",
  definition: "Lizzy Walton, Alan's eldest child",
  spellings: [{ partOfSpeech: "part-of-speech/proper-noun", spelling: "Lizzy" }],
  answeredBy: "persona/claude",
  phone: "+13854562072",
} as const satisfies Person
