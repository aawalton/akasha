import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const beVerbWithAPresentParticiple = {
  id: "01a0ca12-af3e-7c2a-8691-f11ab7829d6d",
  type: "page-type/construction",
  slug: "be-verb-with-a-present-participle",
  definition: "a verb phrase written from a form of be and what a thing is doing",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: ["part-of-speech/be-verb", "part-of-speech/present-participle"],
  admits: ["is doing", "are running", "was holding"],
  refuses: ["is", "doing", "doing is"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What is doing the thing is named before this rather than after it.",
    },
  ],
} as const satisfies Construction
