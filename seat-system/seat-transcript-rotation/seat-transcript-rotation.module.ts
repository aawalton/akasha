import type { Module } from "@akasha/code-system/module"

export const seatTranscriptRotation = {
  id: "01a071f5-4e4d-79a8-aff6-911818ba3e7e",
  pageTypeSlug: "module",
  slug: "seat-transcript-rotation",
  definition: "the transcript a seat should be read from where a clear superseded the one it names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat naming no transcript has none rotated.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript the seat names that is not on the disk has none rotated.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript written within the last minute is still live and rotates to none.",
    },
    {
      invariantKind: "departure",
      statement: "A candidate is a `.jsonl` file directly beside the one the seat names.",
    },
    {
      invariantKind: "departure",
      statement: "A file no newer than the one the seat names is no candidate.",
    },
    {
      invariantKind: "departure",
      statement: "A file any seat names is no candidate.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file whose first record was written before the named file's last write is no candidate.",
    },
    {
      invariantKind: "departure",
      statement: "Exactly one candidate left is the answer, and any other number answers nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record's timestamp is read off the top of that record rather than out of anything nested in it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The opening records of a transcript carry no timestamp, and how many of them there are differs by session.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript is read for its opening bytes alone rather than whole.",
    },
    {
      invariantKind: "departure",
      statement: "The rule is decided from a reading of the disk rather than from the disk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes, and no rotated session is kept.",
    },
  ],
} as const satisfies Module
