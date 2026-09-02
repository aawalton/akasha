import type { Module } from "@akasha/code-system/module"

export const dataEncodeTypes = {
  id: "01a06061-96a2-7fff-82c3-b9b5976c8acf",
  pageTypeSlug: "module",
  slug: "data-encode-types",
  definition: "the shape of the encoder, the decoder, the dictionary and the library surface",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A dictionary entry is a string or a number.",
    },
    {
      invariantKind: "departure",
      statement: "A class and the instances of that class are shaped apart.",
    },
    {
      invariantKind: "departure",
      statement: "Decoding answers two values at once.",
    },
  ],
} as const satisfies Module
