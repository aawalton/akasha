import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const style = {
  id: "01a065a0-140b-7657-b6e6-589ac95defd6",
  type: "page-type/domain",
  slug: "style",
  definition: "how Alan dresses, grooms and has himself",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "style" },
    { partOfSpeech: "part-of-speech/noun", spelling: "styles" },
  ],
  parts: ["page-type/appearance-experiment"],
} as const satisfies Domain
