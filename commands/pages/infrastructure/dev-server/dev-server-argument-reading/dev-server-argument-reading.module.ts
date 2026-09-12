import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const devServerArgumentReading = {
  id: "01a08df9-5e27-71e7-8009-6228d636611b",
  type: "module",
  slug: "dev-server-argument-reading",
  definition: "the seq, the app and the flags one dev-server call names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The flags a command takes are handed in rather than known here.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a command names one server, one or every server, or neither, is handed in too.",
    },
    {
      invariantKind: "departure",
      statement: "A valued flag whose next word is missing or is a flag is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A seq and a port each name a whole number that is not negative.",
    },
    {
      invariantKind: "departure",
      statement: "A tail names a whole number above nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A tail unsaid is a hundred lines.",
    },
    {
      invariantKind: "departure",
      statement: "A flag the command does not take is refused, naming the flags it takes.",
    },
    {
      invariantKind: "departure",
      statement: "Every refusal one reading found is answered at once rather than the first alone.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here starts, stops or reads a server.",
    },
  ],
} as const satisfies Module
