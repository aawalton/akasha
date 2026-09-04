import type { Module } from "../modules/module.page-type.ts"

export const utf8Body = {
  id: "01a06553-a9b5-76cc-b4e6-e4e42b4a0f0d",
  pageTypeSlug: "module",
  slug: "utf8-body",
  definition: "bytes as the text they spell, and the first of them in hex where they spell none",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every body read through here goes through one decoder.",
    },
    {
      invariantKind: "departure",
      statement: "Bytes that are not text say nothing rather than a replacement character.",
    },
    {
      invariantKind: "departure",
      statement: "Bytes holding a zero byte spell no text.",
    },
    {
      invariantKind: "constraint",
      statement: "A caller wanting those bytes read anyway reaches for a decoder that is lenient.",
    },
    {
      invariantKind: "constraint",
      statement: "Eight bytes at the most are said in hex.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows which file the bytes came from or what the text means.",
    },
  ],
} as const satisfies Module
