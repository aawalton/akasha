import type { Module } from "@akasha/code/module"

export const seatTranscriptRotation = {
  id: "01a071f5-4e4d-79a8-aff6-911818ba3e7e",
  pageTypeSlug: "module",
  type: "module",
  slug: "seat-transcript-rotation",
  definition: "the transcript a seat should be read from where a clear superseded the one it names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seat naming no transcript has no transcript rotated.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript the seat names that is not on the disk is not rotated.",
    },
    {
      invariantKind: "departure",
      statement: "A transcript written within the last minute is still live and is not rotated.",
    },
    {
      invariantKind: "departure",
      statement: "A candidate is a `.jsonl` file directly beside the transcript the seat names.",
    },
    {
      invariantKind: "departure",
      statement: "A file no newer than the transcript the seat names is no candidate.",
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
      statement: "The answer comes only where exactly one candidate is left.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record's timestamp is read off the record's top rather than out of anything nested in the record.",
    },
    {
      invariantKind: "constraint",
      statement: "The opening records of a transcript have no timestamp.",
    },
    {
      invariantKind: "constraint",
      statement: "How many opening records a transcript has differs by session.",
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
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "absence",
      statement: "No rotated session is kept.",
    },
  ],
} as const satisfies Module
