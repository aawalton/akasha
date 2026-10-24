import type { Person } from "akasha/person/person.page-type.types.ts"

export const jenny = {
  id: "01a053fe-00f0-7efb-8843-89602ea5d18b",
  type: "page-type/person",
  slug: "jenny",
  definition: "Jennifer Walton, Alan's wife",
  spellings: [
    { partOfSpeech: "part-of-speech/proper-noun", spelling: "Jenny" },
    { partOfSpeech: "part-of-speech/proper-noun", spelling: "Jennifer" },
  ],
  answeredBy: "persona/claudius",
  phone: "+16085122511",
  email: "smilingjenny@gmail.com",
  scheme: "system",
  contributor:
    "contributor/contributor-a4695dc2334e4f3a84ac562783ff54f9955e8bbcf8ba67ac6271b6fe035eb67f",
  createdAt: "2026-08-30T18:45:50.448Z",
  updatedAt: "2026-10-24T21:54:03.334Z",
} as const satisfies Person
