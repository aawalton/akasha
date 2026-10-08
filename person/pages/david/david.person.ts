import type { Person } from "akasha/person/person.page-type.types.ts"

export const david = {
  id: "01a053fe-00f0-7112-a569-989bfe576b71",
  type: "page-type/person",
  slug: "david",
  definition: "David Eggertsen, Alan's friend since childhood",
  spellings: [
    { partOfSpeech: "part-of-speech/proper-noun", spelling: "David" },
    { partOfSpeech: "part-of-speech/proper-noun", spelling: "Eggertsen" },
  ],
  answeredBy: "persona/amy",
  phone: "+14355720344",
  email: "deggertsen@gmail.com",
  createdAt: "2026-08-30T18:45:50.448Z",
  updatedAt: "2026-09-24T17:45:18.000Z",
} as const satisfies Person
