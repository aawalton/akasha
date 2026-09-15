import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const utf8Body = {
  id: "01a06553-a9b5-76cc-b4e6-e4e42b4a0f0d",
  type: "module",
  slug: "utf8-body",
  definition: "bytes as the text they spell, and the first of them in hex where they spell none",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every body read through here goes through one decoder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Bytes that are not text say nothing rather than a replacement character.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Bytes with a zero byte spell no text.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A caller wanting those bytes read anyway reaches for a decoder that is lenient.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Eight bytes at the most are said in hex.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows which file the bytes came from or the meaning of the text.",
    },
  ],
} as const satisfies Module
