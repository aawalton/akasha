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
} as const satisfies Person
