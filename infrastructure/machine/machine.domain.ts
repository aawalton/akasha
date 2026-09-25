import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const machine = {
  id: "01a06596-0000-7000-8000-000000000301",
  type: "page-type/domain",
  slug: "machine",
  definition: "the machines Alan has",
  parts: ["domain/provisioning", "page-type/computer", "page-type/host"],
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "machine" },
    { partOfSpeech: "part-of-speech/noun", spelling: "machines" },
  ],
} as const satisfies Domain
