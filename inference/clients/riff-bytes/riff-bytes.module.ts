import type { Module } from "@akasha/code/module"

export const riffBytes = {
  id: "01a07c81-bfd9-78c8-90fa-e6dee251111a",
  pageTypeSlug: "module",
  type: "module",
  slug: "riff-bytes",
  definition: "the bytes a voice service answered, weighed for the header a wav opens with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A payload no longer than a wav header is no wav.",
    },
    {
      invariantKind: "departure",
      statement: "A payload is weighed by the four bytes that payload opens with.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the sound a payload has past its header.",
    },
  ],
} as const satisfies Module
