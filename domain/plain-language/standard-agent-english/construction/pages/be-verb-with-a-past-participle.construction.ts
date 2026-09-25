import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const beVerbWithAPastParticiple = {
  id: "01a0c9a2-f76d-71dc-bf94-7139fa224b3b",
  type: "page-type/construction",
  slug: "be-verb-with-a-past-participle",
  definition: "a verb phrase written from a form of be and what was done",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: ["part-of-speech/be-verb", "part-of-speech/past-participle"],
  admits: ["is kept", "are shown", "was drawn"],
  refuses: ["is", "kept", "kept is"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Who did the thing is left out, or is named by a preposition phrase after this.",
    },
  ],
} as const satisfies Construction
