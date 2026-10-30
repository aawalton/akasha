import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const beVerbWithADegreeAdverbAndAnAdjective = {
  id: "01a18d7f-9ecd-78c6-895e-5cc4e2e06b1a",
  type: "page-type/construction",
  slug: "be-verb-with-a-degree-adverb-and-an-adjective",
  definition: "a verb phrase written from a form of be, a degree adverb and an adjective",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: [
    "part-of-speech/be-verb",
    "part-of-speech/degree-adverb",
    "part-of-speech/adjective",
  ],
  admits: ["an agent that is no longer present", "whether a seat is still idle"],
  refuses: ["an agent that no longer is present", "an agent that is present no longer"],
  createdAt: "2026-10-30T15:48:33.611Z",
  updatedAt: "2026-10-30T15:48:33.611Z",
} as const satisfies Construction
