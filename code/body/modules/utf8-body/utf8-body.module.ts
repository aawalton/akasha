import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const utf8Body = {
  id: "01a06553-a9b5-76cc-b4e6-e4e42b4a0f0d",
  type: "page-type/module",
  slug: "utf8-body",
  definition: "bytes as the text they spell, and the first of them in hex where they spell none",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every body read through here goes through one decoder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Bytes that are not text say nothing rather than a replacement character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Bytes with a zero byte spell no text.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A caller wanting those bytes read anyway reaches for a decoder that is lenient.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Eight bytes at the most are said in hex.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows which file the bytes came from or the meaning of the text.",
    },
  ],
} as const satisfies Module
