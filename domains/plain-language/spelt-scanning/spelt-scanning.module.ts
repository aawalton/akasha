import type { Module } from "@akasha/code/module"

export const speltScanning = {
  id: "01a073e3-354d-7124-8a2c-e116b5340d81",
  pageTypeSlug: "module",
  type: "module",
  slug: "spelt-scanning",
  definition: "a backticked name filled with letters of its own length before a sentence is read",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A name inside backticks is read as one word rather than as English.",
    },
    {
      invariantKind: "departure",
      statement: "The filler runs the length the name ran.",
    },
    {
      invariantKind: "departure",
      statement: "Every offset after the name holds.",
    },
    {
      invariantKind: "departure",
      statement: "The backticks themselves are kept.",
    },
  ],
} as const satisfies Module
