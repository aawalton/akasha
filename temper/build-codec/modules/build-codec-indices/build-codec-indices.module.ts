import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildCodecIndices = {
  id: "01a062e7-4dbf-7cf4-a91c-960bc8977ebf",
  type: "module",
  slug: "build-codec-indices",
  definition: "the small number each of a character build's game constants is packed as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An id these tables do not carry stops the write rather than taking a number.",
    },
  ],
} as const satisfies Module
