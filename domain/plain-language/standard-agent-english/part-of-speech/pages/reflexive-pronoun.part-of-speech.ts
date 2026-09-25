import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const reflexivePronoun = {
  id: "01a0d8ae-8d52-798c-80d4-dc5818ba07b6",
  type: "page-type/part-of-speech",
  slug: "reflexive-pronoun",
  definition: "a word naming the subject again",
} as const satisfies PartOfSpeech
