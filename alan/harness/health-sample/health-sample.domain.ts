import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const healthSample = {
  id: "01a0d5a9-e047-7079-abab-428460d8b74b",
  type: "page-type/domain",
  slug: "health-sample",
  definition: "a measure of Alan's body a device takes",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "health sample" },
    { partOfSpeech: "part-of-speech/noun", spelling: "health samples" },
  ],
  parts: ["domain/health-sample-access", "domain/health-sample-day", "domain/health-sample-import"],
} as const satisfies Domain
