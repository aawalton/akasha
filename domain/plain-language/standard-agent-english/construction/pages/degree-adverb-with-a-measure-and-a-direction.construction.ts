import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const degreeAdverbWithAMeasureAndADirection = {
  id: "01a18d76-7961-70df-99b2-77a62d3b50af",
  type: "page-type/construction",
  slug: "degree-adverb-with-a-measure-and-a-direction",
  definition: "a noun phrase saying how far a thing is in a direction from a line or a place",
  phraseKind: "phrase-kind/noun-phrase",
  writtenFrom: [
    "part-of-speech/degree-adverb",
    "part-of-speech/determiner",
    "phrase-kind/noun-group",
    "part-of-speech/adjective",
    "phrase-kind/preposition-phrase",
    "phrase-kind/noun-phrase",
    "part-of-speech/be-verb",
  ],
  admits: [
    "how many degrees north of the equator a place is",
    "how many degrees east of the prime meridian a place is",
  ],
  refuses: [
    "how many degrees north a place is",
    "how many degrees north of the equator is a place",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The adjective names a direction, and the preposition phrase names where it is counted from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The noun group names the unit the distance is counted in.",
    },
  ],
  createdAt: "2026-10-30T15:38:34.206Z",
  updatedAt: "2026-10-30T15:38:34.206Z",
} as const satisfies Construction
