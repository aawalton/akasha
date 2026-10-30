import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const beVerbWithAnAdjective = {
  id: "01a18d7b-f3d5-788d-8c6f-90e335b24c50",
  type: "page-type/construction",
  slug: "be-verb-with-an-adjective",
  definition:
    "a verb phrase written from a form of be and an adjective saying what the subject is like",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: ["part-of-speech/be-verb", "part-of-speech/adjective"],
  admits: ["whether a seat is idle", "a seat that is idle", "the seats that are idle"],
  refuses: ["idle is", "is"],
  createdAt: "2026-10-30T15:44:33.232Z",
  updatedAt: "2026-10-30T15:44:33.232Z",
} as const satisfies Construction
