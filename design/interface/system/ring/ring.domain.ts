import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const ring = {
  id: "01a0655b-9cdd-73ae-8a72-25ca95f9932b",
  type: "page-type/domain",
  slug: "ring",
  definition: "a reading drawn as an arc around the figure it reads",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "ring" },
    { partOfSpeech: "part-of-speech/noun", spelling: "rings" },
  ],
  parts: ["domain/budget-ring", "domain/completion-ring", "domain/stoplight-ring"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A ring is one of two sizes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The small ring is the size three small rings span a small tile at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The large ring fills a small tile alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every arc starts at twelve o'clock and sweeps clockwise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The figure sits inside the ring and the label below that ring.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A ring leaves slack above its label rather than taking every point the label does not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The emoji a ring draws in place of itself is drawn at the size the ring draws rather than is given.",
    },
  ],
} as const satisfies Domain
