import type { Module } from "@akasha/code-system/module"

export const turnWorking = {
  id: "01a0687b-3c85-7000-b60f-9d7b8c037697",
  pageTypeSlug: "module",
  slug: "turn-working",
  definition: "whether a seat is part way through a turn, read from the last answer it wrote",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat is working until an answer ends its turn.",
    },
    {
      invariantKind: "departure",
      statement: "A prompt with nothing answering it yet is a turn still to finish.",
    },
    {
      invariantKind: "departure",
      statement: "A record that is neither a prompt nor an answer neither starts nor ends a turn.",
    },
    {
      invariantKind: "departure",
      statement: "Unread is not off.",
    },
    {
      invariantKind: "departure",
      statement: "An unread seat and a seat that is not working are told apart.",
    },
    {
      invariantKind: "departure",
      statement:
        "An answer is looked for in the tail of a transcript rather than in the whole transcript.",
    },
    {
      invariantKind: "departure",
      statement: "The tail widens until an answer is found or the whole transcript has been read.",
    },
    {
      invariantKind: "departure",
      statement: "A line the tail's edge severed is dropped rather than read.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript no longer than when it was last read is not read again.",
    },
    {
      invariantKind: "departure",
      statement: "The byte a transcript was read to is kept beside the seat.",
    },
    {
      invariantKind: "departure",
      statement: "A reading kept in an unknown shape is unread.",
    },
    {
      invariantKind: "absence",
      statement: "No hook is asked what a seat is doing.",
    },
  ],
} as const satisfies Module
