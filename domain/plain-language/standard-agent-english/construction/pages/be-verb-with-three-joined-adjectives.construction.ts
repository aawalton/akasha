import type { Construction } from "akasha/domain/plain-language/standard-agent-english/construction/construction.page-type.types.ts"

export const beVerbWithThreeJoinedAdjectives = {
  id: "01a18daf-d3de-7f55-bb24-cb8e395e030d",
  type: "page-type/construction",
  slug: "be-verb-with-three-joined-adjectives",
  definition:
    "a verb phrase written from a form of be and three adjectives each joined by a conjunction",
  phraseKind: "phrase-kind/verb-phrase",
  writtenFrom: [
    "part-of-speech/be-verb",
    "part-of-speech/adjective",
    "part-of-speech/conjunction",
    "part-of-speech/adjective",
    "part-of-speech/conjunction",
    "part-of-speech/adjective",
  ],
  admits: ["whether a topic is new or open or idle"],
  refuses: ["whether a topic is new open or idle", "whether a topic is new or open or"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A conjunction comes before each adjective after the first, since no comma parses.",
    },
  ],
  createdAt: "2026-10-30T16:41:12.924Z",
  updatedAt: "2026-10-30T16:41:12.924Z",
} as const satisfies Construction
