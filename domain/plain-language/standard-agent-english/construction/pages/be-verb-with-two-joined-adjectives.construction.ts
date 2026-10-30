import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const beVerbWithTwoJoinedAdjectives = {
  id: "01a18daf-3213-71c4-8e00-eb1303fd05fe",
  type: "page-type/construction",
  slug: "be-verb-with-two-joined-adjectives",
  definition: "a verb phrase written from a form of be and two adjectives a conjunction joins",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: [
    "part-of-speech/be-verb",
    "part-of-speech/adjective",
    "part-of-speech/conjunction",
    "part-of-speech/adjective",
  ],
  admits: ["whether a topic is open or idle", "a seat that is idle or present"],
  refuses: ["whether a topic is open or", "whether a topic is or idle"],
  createdAt: "2026-10-30T16:40:31.505Z",
  updatedAt: "2026-10-30T16:40:31.505Z",
} as const satisfies Construction
