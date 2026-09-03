import type { Module } from "../../code-system/modules/module.page-type.ts"

export const tailFold = {
  id: "01a064f0-734e-7895-96ab-58a7eeeeee3b",
  pageTypeSlug: "module",
  slug: "tail-fold",
  definition:
    "the lines a growing file gained since the last fold and the offset that fold ends at",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A fold takes the bytes lying after the offset rather than the whole file.",
    },
    {
      invariantKind: "departure",
      statement: "An offset comes to rest at a line ending rather than at the last byte read.",
    },
    {
      invariantKind: "departure",
      statement: "A file shorter than the offset is folded again from the first byte.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file that no longer reads as the anchor says is folded again from the first byte.",
    },
    {
      invariantKind: "departure",
      statement: "The anchor is the 64 bytes ending the offset.",
    },
    {
      invariantKind: "departure",
      statement: "A reset reaches the caller before any line of a refold.",
    },
    {
      invariantKind: "departure",
      statement: "Bytes are carried between pieces as bytes rather than as text.",
    },
    {
      invariantKind: "departure",
      statement: "Only bytes up to a line ending are decoded.",
    },
    {
      invariantKind: "departure",
      statement: "The event loop is let go between pieces.",
    },
    {
      invariantKind: "departure",
      statement: "Bytes after the last line ending are handed back rather than counted as folded.",
    },
    {
      invariantKind: "departure",
      statement: "A file that cannot be read is answered as missing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to disk.",
    },
  ],
} as const satisfies Module
