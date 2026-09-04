import type { Module } from "../../code-system/modules/module.page-type.ts"

export const transcriptReading = {
  id: "01a06811-01d3-7001-82ae-508e168fc61f",
  pageTypeSlug: "module",
  slug: "transcript-reading",
  definition: "one fold per transcript file, advanced over the bytes appended since the last read",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file is folded only over the bytes appended since the last read.",
    },
    {
      invariantKind: "departure",
      statement: "The fold is the drawn corpus rather than a cursor.",
    },
    {
      invariantKind: "departure",
      statement: "The bytes after the last newline are folded in and journalled.",
    },
    {
      invariantKind: "departure",
      statement: "A journalled record is taken back out before those bytes are read again.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file no longer reading as it did where the fold stopped is folded from its first byte.",
    },
    {
      invariantKind: "departure",
      statement: "A read says which files it folded from their first byte.",
    },
    {
      invariantKind: "departure",
      statement: "The subagent roll is taken again only when the directory's mtime moves.",
    },
    {
      invariantKind: "departure",
      statement: "A fold for a file no longer in the roll is dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A read says how many bytes it folded and how many stand.",
    },
    {
      invariantKind: "departure",
      statement: "The entries a read answers are the reader's own arrays.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller reads an answered array before it asks for the next read.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here is written to disk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here draws anything.",
    },
  ],
} as const satisfies Module
