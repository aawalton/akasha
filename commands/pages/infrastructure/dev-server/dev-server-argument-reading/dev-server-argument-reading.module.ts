import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const devServerArgumentReading = {
  id: "01a08df9-5e27-71e7-8009-6228d636611b",
  pageTypeSlug: "module",
  type: "module",
  slug: "dev-server-argument-reading",
  definition: "the act, the seq, the app and the flags one dev-server call names",
  code: "ts",
  invariants: [
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
      statement: "A flag an act does not take is refused, naming the flags that act takes.",
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
