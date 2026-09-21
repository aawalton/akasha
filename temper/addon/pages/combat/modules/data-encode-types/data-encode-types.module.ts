import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const dataEncodeTypes = {
  id: "01a06061-96a2-7fff-82c3-b9b5976c8acf",
  type: "page-type/module",
  slug: "data-encode-types",
  definition: "the shape of the encoder, the decoder, the dictionary and the library surface",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A dictionary entry is a string or a number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A class and the instances of that class are shaped apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Decoding answers two values at once.",
    },
  ],
} as const satisfies Module
