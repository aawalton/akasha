import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transcriptReading = {
  id: "01a06811-01d3-7001-82ae-508e168fc61f",
  type: "module",
  slug: "transcript-reading",
  definition: "one fold per transcript file, advanced over the bytes appended since the last read",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file is folded only over the bytes appended after the last read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The fold is the drawn corpus rather than a cursor.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The bytes after the last newline are folded in and journalled.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A journalled record is taken back out before those bytes are read again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file no longer reading as that file did where the fold stopped is folded from its first byte.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read says which files that read folded from their first byte.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The subagent roll is taken again only when the directory's mtime moves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fold for a file no longer in the roll is dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A read says how many bytes that read folded and how many bytes remain.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The entries a read answers are the reader's own arrays.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller reads an answered array before that caller asks for the next read.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here is written to disk.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here draws anything.",
    },
  ],
} as const satisfies Module
