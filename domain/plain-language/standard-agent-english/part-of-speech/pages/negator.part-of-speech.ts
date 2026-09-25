import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const negator = {
  id: "01a0d987-dcb2-7262-ad4d-be02e16d6b4a",
  type: "page-type/part-of-speech",
  slug: "negator",
  definition: "a word that turns what follows it into its opposite",
} as const satisfies PartOfSpeech
