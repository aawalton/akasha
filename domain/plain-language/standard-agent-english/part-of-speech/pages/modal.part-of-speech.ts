import type { PartOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.types.ts"

export const modal = {
  id: "01a0ca71-0b5c-7c0d-8205-66ae4b6ed2ee",
  type: "page-type/part-of-speech",
  slug: "modal",
  definition: "a word saying whether an act is possible, allowed or required",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A modal is a closed class, so the words here are nearly all there are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The verb after a modal is the plain form rather than one bent for its subject.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A modal carries no tense of its own, so no be-verb is written in front of one.",
    },
  ],
} as const satisfies PartOfSpeech
