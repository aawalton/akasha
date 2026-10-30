import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const nounGroupWithAPastParticiple = {
  id: "01a18d7a-0d37-7016-abb4-300cb7fcc76f",
  type: "page-type/construction",
  slug: "noun-group-with-a-past-participle",
  definition: "a noun group written from a past participle and the noun group it describes",
  phraseKind: "phrase-kind/noun-group",
  writtenFrom: ["part-of-speech/past-participle", "phrase-kind/noun-group"],
  admits: ["a restarted seat", "a stopped process", "a stored message"],
  refuses: ["a seat restarted process", "restarted a seat"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A word spelled as a past participle states no adjective spelling, so it is read one way here.",
    },
  ],
  createdAt: "2026-10-30T15:42:28.660Z",
  updatedAt: "2026-10-30T15:42:28.660Z",
} as const satisfies Construction
